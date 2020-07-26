const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs_writeFile = util.promisify(fs.writeFile);

const textToSpeech = new TextToSpeechV1({
	authenticator: new IamAuthenticator({
		apikey: process.env.TOS_API_KEY,
	}),
	url: process.env.TOS_SEVER,
});

module.exports.convertTextToSpeechAndSave = (text) => {
	return textToSpeech
		.synthesize({
			text: text,
			voice: 'en-US_AllisonV3Voice',
			accept: 'audio/wav',
		})
		.then((response) => {
			return textToSpeech.repairWavHeaderStream(response.result);
		})
		.then((buffer) => {
			let fileName = uuidv4() + '.wav';
			return fs_writeFile(fileName, buffer).then(() => fileName);
		});
};
