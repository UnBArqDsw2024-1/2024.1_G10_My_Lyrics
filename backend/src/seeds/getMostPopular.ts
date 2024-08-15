import { appendFileSync, writeFileSync } from "node:fs";
import axios from "axios";
import * as cheerio from "cheerio";
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

interface IAlbum {
	title: string;
	cover?: string;
}

interface IMusic {
	title: string;
	author: string;
	youtubeUrl: string;
	iconUrl: string;
	verses: IVerse[];
	album: IAlbum;
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
	const songResponse = await axios.get(song.url).catch(() => undefined);

	if (!songResponse) {
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

	const lyricsResponse = await axios
		.get(`https://www.letras.com/api/v2/subtitle/${id}/${youtubeId}/?`)
		.catch(() => undefined);
	if (!lyricsResponse?.data?.Original?.Subtitle) {
		return undefined;
	}

	const lyrics: [string, string, string][] = JSON.parse(
		lyricsResponse.data.Original.Subtitle,
	);
	const verses: IVerse[] = lyrics.map(
		([text, startTime, endTime]: [string, string, string]) => ({
			startTime: Math.round(Number.parseFloat(startTime) * 1000),
			endTime: Math.round(Number.parseFloat(endTime) * 1000),
			text: text.trim(),
		}),
	);

	const album = await fetchAlbum(song.title, song.author);

	return {
		title: song.title,
		author: song.author,
		youtubeUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
		iconUrl: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
		verses,
		album: album, // Adiciona as informações do álbum aqui
	};
}

function stringToSlug(str: string) {
	return str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

async function fetchAlbum(
	musicTitle: string,
	author: string,
): Promise<IAlbum & { artistProfile?: string }> {
	const authorSlug = stringToSlug(author);

	const discographyResponse = await axios
		.get(`https://www.letras.com/${authorSlug}/discografia`, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/127.0.0.0 Safari/537.36",
				Accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
				"Accept-Language": "en-US,en;q=0.9",
			},
		})
		.catch(() => undefined);

	if (!discographyResponse) {
		return { title: musicTitle };
	}

	const $ = cheerio.load(discographyResponse.data);
	const albums = $("div[data-type='album']");
	let albumWithMusic: IAlbum = {
		title: "",
	};

	albums.each((_, element) => {
		const musics = $(element).find(".songList-table");
		const albumTitle = $(element).find("h1.songList-header-name > a").text();
		const albumCover = $(element)
			.find("div.songList-header-cover > div > img")
			.attr("data-original");

		if (musics.text().includes(musicTitle)) {
			albumWithMusic = {
				title: albumTitle,
				cover: albumCover,
			};
		}
	});

	const artistProfile = $(
		"#cnt_top > div.artist.g-mb > div.head.--artist.gridContainer.--smallMargin > div.head-titleContainer > div > div.thumbnail.--skin-image.--shape-circle.--size-medium.--tabletSize-medium > img",
	).attr("src");

	return { ...albumWithMusic, artistProfile };
}

async function sleep(ms: number) {
	return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

(async () => {
	const sleepTime = 1000;
	const musicsFilepath = "musics.json";

	const prismaClient = DatabaseConnection.getInstance();
	await prismaClient.$connect();

	const songs = await MostAccessFromLetras();

	writeFileSync(musicsFilepath, "[", { flag: "w" });

	for (let i = 0; i < songs.length; i++) {
		const song = songs[i];
		const music = await fetchLyrics(song);

		if (music) {
			const alreadyExists = await prismaClient.music.findFirst({
				where: {
					title: music.title,
				},
			});

			if (alreadyExists) {
				console.log(alreadyExists.title, "já existe, então estarei pulando...");
				continue;
			}

			let albumEntry;

			const albumExists = await prismaClient.album.findFirst({
				where: {
					title: music.album.title,
				},
			});

			if (albumExists) {
				albumEntry = albumExists;
			} else {
				albumEntry = await prismaClient.album.create({
					data: {
						title: music.album.title || music.title,
						coverUrl: music.album.cover,
						artists: {
							connectOrCreate: [
								{
									where: {
										name: music.author,
									},
									create: {
										name: music.author,
										profileUrl: music.album.artistProfile, // Adiciona a URL do perfil do artista
										biography: "",
									},
								},
							],
						},
					},
				});
			}

			await prismaClient.music.create({
				data: {
					iconUrl: music.iconUrl,
					youtubeUrl: music.youtubeUrl,
					title: music.title,
					verses: {
						createMany: {
							data: music.verses,
						},
					},
					album: {
						connect: {
							id: albumEntry.id,
						},
					},
				},
			});

			appendFileSync(musicsFilepath, JSON.stringify(music, null, 2));

			if (i < songs.length - 1) {
				appendFileSync(musicsFilepath, ",\n");
			}

			console.log(music.title, "foi criado com sucesso!!!");
		}

		if ((i + 1) % 10 === 0) {
			await sleep(sleepTime);
		}
	}

	appendFileSync(musicsFilepath, "]", { flag: "a" });
})();
