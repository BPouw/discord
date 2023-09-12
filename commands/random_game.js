const { SlashCommandBuilder } = require('discord.js');
const { join } = require('path')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random_game')
		.setDescription('The dragon will recommend you a random game to play'),
	async execute(interaction) {
        let fs = require('fs');
        let path = join(process.cwd(), 'data', 'games.txt');
        fs.readFile(path, function(err, data) {
            if(err) throw err;
            let games = data.toString().split("\n");
            let randomNumber = Math.floor(Math.random()*games.length);
            interaction.reply(games[randomNumber]);
        });
	},
};
