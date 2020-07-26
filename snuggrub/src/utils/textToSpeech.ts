import { Audio } from 'expo-av';
import { GooglePlace } from 'models/GooglePlace';
import { expressServer } from './apiKey';

export const summarizeText = (
	place: GooglePlace,
	text1,
	text2,
	text3,
	text4,
	text5
) => {
	let text = place.name + '.';

	text += ' Is currently ';
	text += place.opening_hours.open_now ? 'open. ' : 'not open. ';

	text += ' ' + text1;
	text += ' ' + text2;
	text += ' ' + text3;
	text += ' ' + text4;
	text += ' ' + text5;

	return text;
};

export const createAudioFile = async (text: string): Promise<string> => {
	const response = await fetch(`${expressServer}/createAudio`, {
		method: 'post',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			text,
		}),
	});

	let json = await response.json();

	return json.fileName;
};

export const fetchAndPlayAudioFile = async (fileName: string) => {
	const soundObject = new Audio.Sound();
	try {
		await soundObject.loadAsync({
			uri: `${expressServer}/getAudio/${fileName}`,
		});
		await soundObject.playAsync();
	} catch (error) {
		// // An error occurred!
		// console.log(error);
	}
};
