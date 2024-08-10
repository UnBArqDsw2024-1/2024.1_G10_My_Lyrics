import axios from "axios";
import * as cheerio from "cheerio";

interface ISong {
	title: string;
	author: string;
	url: string;
}

async function getMostPopular() {
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

	$("ol.top-list_mus > li").each((index, element) => {
		const songTitle = $(element).find("b").text().trim();
		const songAuthor = $(element).find("span").text().trim();
		const songUrl = $(element).find("a").attr("href") as string;

		songs.push({
			title: songTitle,
			author: songAuthor,
			url: `https://www.letras.com${songUrl}`,
		});
	});

	let i = 0;
	for (const song of songs) {
		const songResponse = await axios.get(song.url);
		const $ = cheerio.load(songResponse.data, {
			xml: false,
		});

		const songData = $("#js-scripts").text();

		const regex =
			/"ID":(\d+),"URL":"[^"]+","Name":"[^"]+","DNS":"[^"]+","Artist":"[^"]+","ArtistID":\d+,"Locale":"[^"]+","YoutubeID":"([^"]+)","StartSeconds":\d+,"Duration":"[^"]*","CifraURL":"[^"]*","Adult":(?:true|false),"CopyrightStrike":\{[^}]*\},"AlbumID":\d+,"OGImage":"[^"]*".*?"Thumb":"([^"]+)"/;
		const match = songData.match(regex);

		if (match) {
			const id = match[1];
			const youtubeId = match[2];
			const thumbnail = match[3];

			const lyricsResponse = await axios.get(
				`https://www.letras.com/api/v2/subtitle/${id}/${youtubeId}/?`,
			);
			const lyrics = JSON.parse(await lyricsResponse.data.Original.Subtitle);

			const formattedLyrics = lyrics.map(
				([text, startTime, endTime]: [string, string, string]) => ({
					startTime: Math.round(Number.parseFloat(startTime) * 1000),
					endTime: Math.round(Number.parseFloat(endTime) * 1000),
					text: text,
					translatedText: null,
				}),
			);

			console.log({
				lyrics: formattedLyrics,
				id,
				youtubeId,
				thumbnail,
				author: song.author,
				title: song.title,
			});
		} else {
			console.log("Não foi possível encontrar os valores.");
		}

		i++;
		if (i === 5) {
			break;
		}
	}
}

getMostPopular();
