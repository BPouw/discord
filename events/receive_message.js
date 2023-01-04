const { Events } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {
		if (!interaction.guild) return;
        if (interaction.author.bot == true) return;
        if (interaction.channelId != '295583949176963085') return;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "The following is a conversation with a wise dragon. The dragon talks like a dragon and is wise, mystical, and ancient \nHuman: " + interaction.content + "\n",
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: [" Human:", " Dragon:"],
          });
        await interaction.reply(response.data.choices[0].text)
	},
};