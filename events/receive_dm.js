const { Events } = require('discord.js');
const openai = require('../data/openai_client');

module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {
        const MY_DISCORD_USERNAME = "pouw";
		if (interaction.guild) return;
        if (interaction.author.bot) return;
        let response;
        if (interaction.author.username === MY_DISCORD_USERNAME) {
            response = await openai.createPouwResponse(interaction.content);
        } else {
            response = await openai.createDragonResponse(interaction.content);
        }
        await interaction.author.send(response.choices[0].message.content)
        .catch(() => {
            console.log('Not authorized to DM this user');
        });
	},
};
