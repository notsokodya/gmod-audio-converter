const ffmpeg = require('fluent-ffmpeg');
const fs = require("fs");

const input_folder = "./input/";
const output_folder = "./output/";

if ( !fs.existsSync(input_folder) ) {
	console.log("Input folder doesn't exist");
	console.log("Creating input folder");
	console.log("Please put audio files into \"input\" folder and run script again.");
	fs.mkdirSync(input_folder);
	process.exit();
}
if ( !fs.existsSync(output_folder) ) {
	console.log("Output folder doesn't exist");
	console.log("Creating output folder");
	fs.mkdirSync(output_folder);
}

const file_regex = /(.+)\..+$/;

fs.readdir(input_folder, (err, files) => {
	if ( err ) {
		console.log("ahahahaha...... oopsie, looks like le fs threw le error");
		console.error(err);
		process.exit();
	} else {
		if ( !files.length ) {
			console.log("Input folder is empty!");
		} else {
			files.forEach(file => {
				const ff = file.match(file_regex)[1];

				const cmd = ffmpeg(input_folder + file).audioCodec("pcm_s16le").audioChannels(1).audioFrequency(44100);
				cmd.clone().save(output_folder + ff + ".wav");
			});
		}
	}
});