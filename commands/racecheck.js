const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('race_check')
		.setDescription('Are we going racing?'),
	async execute(interaction) {
		await interaction.reply("<a:monkasteer:784531240858419240> <a:monkasteer:784531240858419240> <a:monkasteer:784531240858419240>")
	},
};