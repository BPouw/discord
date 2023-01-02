const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('good_bot')
		.setDescription('Show your appreciation for the dragon'),
	async execute(interaction) {
        await interaction.reply(`The dragon appreciates you too ${interaction.user.username.toLowerCase()}`)
        const message = await interaction.fetchReply();
		await message.react("❤️")
        await message.react("🐉")
	},
};