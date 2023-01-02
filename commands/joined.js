const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joined_at')
		.setDescription('The dragon will tell you how long you have been a part of this server'),
	async execute(interaction) {
		await interaction.reply(`The user ${interaction.user.username.toLowerCase()} has joined us on ${interaction.member.joinedAt.toLocaleDateString("nl-NL")}.`)
	},
};