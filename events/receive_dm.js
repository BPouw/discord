const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {
		if (interaction.guild) return;
        await interaction.author.send("The dragon has nothing to discuss with you, for all my commands I refer you back to dragon energy")
        .catch(() => {
            console.log('Not authorized to DM this user')
        }) 
	},
};