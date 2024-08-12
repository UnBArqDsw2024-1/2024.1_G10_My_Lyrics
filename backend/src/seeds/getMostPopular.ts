import axios from "axios";
import * as cheerio from "cheerio";
import { writeFileSync } from "fs";
import { DatabaseConnection } from "../infra/database/GetConnection";

interface ISong {
	title: string;
	author: string;
	url: string;
}

interface IVerse {
	startTime: number;
	endTime: number;
	text: string;
	translatedText?: string;
}

interface IMusic {
	title: string;
	author: string;
	youtubeUrl: string;
	iconUrl: string;
	verses: IVerse[];
}

async function MostAccessFromLetras(): Promise<ISong[]> {
	const response = await axios.get("https://www.letras.com/mais-acessadas/", {
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
			Accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
			"Accept-Language": "en-US,en;q=0.9",
		},
	});

	const $ = cheerio.load(response.data);

	const songs: ISong[] = [];

	$("ol.top-list_mus > li").each((_, element) => {
		const songTitle = $(element).find("b").text().trim();
		const songAuthor = $(element).find("span").text().trim();
		const songUrl = $(element).find("a").attr("href") as string;

		songs.push({
			title: songTitle,
			author: songAuthor,
			url: `https://www.letras.com${songUrl}`,
		});
	});

	return songs;
}

async function fetchLyrics(song: ISong): Promise<IMusic | undefined> {
	const	songResponse = await axios.get(song.url).catch(() => undefined);
	if(!songResponse) {
		return undefined;
	}

	const $ = cheerio.load(songResponse.data, {
		xml: false,
	});

	const songData = $("#js-scripts").text();

	const regex =
		/"ID":(\d+),"URL":"[^"]+","Name":"[^"]+","DNS":"[^"]+","Artist":"[^"]+","ArtistID":\d+,"Locale":"[^"]+","YoutubeID":"([^"]+)","StartSeconds":\d+,"Duration":"[^"]*","CifraURL":"[^"]*","Adult":(?:true|false),"CopyrightStrike":\{[^}]*\},"AlbumID":\d+,"OGImage":"[^"]*".*?"Thumb":"([^"]+)"/;
	const match = songData.match(regex);

	if (!match) {
		return undefined;
	}

	const [_, id, youtubeId] = match;

	const lyricsResponse = await axios.get(
		`https://www.letras.com/api/v2/subtitle/${id}/${youtubeId}/?`,
	).catch(() => undefined);
	if (!lyricsResponse?.data?.Original?.Subtitle) {
		return undefined;
	}

	const lyrics: any[] = JSON.parse(lyricsResponse.data.Original.Subtitle);
	const verses: IVerse[] = lyrics.map(
		([text, startTime, endTime]: [string, string, string]) => ({
			startTime: Math.round(Number.parseFloat(startTime) * 1000),
			endTime: Math.round(Number.parseFloat(endTime) * 1000),
			text: text,
		}),
	);

	return {
		title: song.title,
		author: song.author,
		youtubeUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
		iconUrl: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
		verses,
	}
}

async function sleep(ms: number) {
	return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

(async () => {
	const sleepTime = 1000;
	const musicsFilepath = "musics.json";

	const musics = [];

	const prismaClient = DatabaseConnection.getInstance();
	await prismaClient.$connect();

	const songs = await MostAccessFromLetras();
	for (const song of songs) {
		await sleep(sleepTime);

		const music = await fetchLyrics(song);
		if (music) {
			musics.push(music);
			writeFileSync(musicsFilepath, JSON.stringify(musics, null, 2));

			const alreadyExists = await prismaClient.music.findFirst({
				where: {
					title: music.title
				}
			});
			if (alreadyExists) {
				console.log(alreadyExists.title, "já existe, então estarei pulando...")
				continue;
			}

			await prismaClient.music.create({
				data: {
					iconUrl: music.iconUrl,
					youtubeUrl: music.youtubeUrl,
					title: music.title,
					verses: {
						createMany: {
							data: music.verses
						}
					},
					album: {
						create: {
							title: music.title,
							artists: {
								connectOrCreate: [{
									where: {
										name: music.author
									},
									create: {
										name: music.author,
										biography: ""
									}
								}]
							}
						}
					}
				}
			});
			console.log(music.title, "foi criado com sucesso!!!");
		}
	}
})()
