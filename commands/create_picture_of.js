const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

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
        const response = await openai.createImage({
            prompt: subject,
            n: 1,
            size: "1024x1024",
          });
          image_url = response.data.data[0].url;
        await interaction.editReply(subject + " " + image_url)
	},
};