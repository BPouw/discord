const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dm_me')
		.setDescription('The dragon will send you a personal message'),
	async execute(interaction) {
		await interaction.reply('The dragon will DM you now 😏')
		await interaction.user.send('You requested personal time with the dragon? 🐲 😏 🔥')
	},
};