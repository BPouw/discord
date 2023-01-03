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
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "The following is a conversation with a wise dragon. The dragon is smart, flirty, and friendly and answers questions in a single response \nHuman: " + interaction.content + "\n",
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: [" Human:", " Dragon:"],
          });
        await interaction.author.send(response.data.choices[0].text)
        .catch(() => {
            console.log('Not authorized to DM this user')
        }) 
	},
};