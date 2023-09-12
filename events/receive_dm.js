const { Events } = require('discord.js');
const openai = require('../data/openai_client');

module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {
		if (interaction.guild) return;
        if (interaction.author.bot) return;
        const response = await openai.createDragonResponse(interaction.content);
        await interaction.author.send(response.choices[0].message.content)
        .catch(() => {
            console.log('Not authorized to DM this user');
        });
	},
};
