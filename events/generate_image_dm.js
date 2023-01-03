const { Events } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {
		if (interaction.guild) return;
        if (!interaction.content.includes('create image of')) return;
        const request = interaction.content.split('of')
        const response = await openai.createImage({
            prompt: request[1],
            n: 1,
            size: "1024x1024",
          });
          image_url = response.data.data[0].url;
        await interaction.author.send(image_url)
        .catch(() => {
            console.log('Not authorized to DM this user')
        }) 
	},
};