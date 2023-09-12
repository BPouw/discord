const { Events } = require('discord.js');
const openai = require('../data/openai_client');

module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {
        const DRAGON_CHANNEL = "295583949176963085";
		if (!interaction.guild) return;
        if (interaction.author.bot === true) return;
        if (interaction.channelId !== DRAGON_CHANNEL) return;
        const response = await openai.createDragonResponse(interaction.content);
        await interaction.reply(response.choices[0].message.content);
	},
};
