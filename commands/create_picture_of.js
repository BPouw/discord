const { SlashCommandBuilder } = require('discord.js');
const openai = require('../data/openai_client');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create_picture_of')
		.setDescription('Give the dragon a description of a picture you want him to create')
        .addStringOption(option =>
            option
                .setName('subject')
                .setDescription('What will the dragon create?')
                .setRequired(true)),
	async execute(interaction) {
        const subject = interaction.options.getString('subject')
        await interaction.reply(subject)
        const response = await openai.createPicture(subject)
          const image_url = response.data[0].url;
          const message = await interaction.fetchReply();
          await message.reply(image_url);
	},
};
