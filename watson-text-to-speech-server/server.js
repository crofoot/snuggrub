require('dotenv').config();
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const { convertTextToSpeechAndSave } = require('./src/create-audio');

const app = express();

app.use(bodyParser.json());

app.post('/createAudio', (req, res) => {
	// console.log(req.body);
	if (req.body.text) {
		convertTextToSpeechAndSave(req.body.text)
			.then((fileName) => {
				res.json({
					fileName: fileName,
				});
			})
			.catch((err) => {
				res
					.json({
						error: 'could not parse text',
					})
					.status(500);
			});
	} else {
		res
			.json({
				error: 'Add text to request',
			})
			.status(500);
	}
});

app.get('/getAudio/:fileName', (req, res) => {
	let filePath = __dirname + '/' + req.params.fileName;
	fs.exists(filePath, (exists) => {
		if (exists) {
			res.sendFile(__dirname + '/' + req.params.fileName);
			// fs.unlink(filePath, () => {});
		} else {
			res.send('Error').status(500);
		}
	});
});

app.listen(8080);
