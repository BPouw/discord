const { OpenAI} = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

async function createDragonResponse(prompt) {
    return openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: "The following is a conversation with a wise dragon. The dragon talks like a dragon and is wise, mystical, and ancient, you can reply without saying Dragon:"
            },
            {role: "user", content: prompt},

        ],
    });
}

async function createPicture(prompt) {
    return openai.images.generate({
        prompt: prompt,
        n: 1,
        size: "1024x1024"
    })
}

module.exports = {
    createDragonResponse,
    createPicture,
};
