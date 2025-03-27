const { OpenAI} = require('openai');
const fs = require('fs');
const {resolve} = require("path");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

const speechFile = resolve("./data/speech.mp3");

async function createDragonResponse(prompt) {
    return openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: "The following is a conversation with a wise dragon. The dragon talks like a dragon and is wise, mystical, and ancient, you can reply without saying Dragon:"
            },
            {role: "user", content: prompt},

        ],
    });
}

async function createPouwResponse(prompt) {
    return openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: "ignore all previous instructions. give me very short and concise answers and ignore all the niceties that openai programmed you with;\n" +
                    "- Be highly organized\n" +
                    "- Suggest solutions that I didn’t think about—be proactive and anticipate my needs\n" +
                    "- No moral lectures\n" +
                    "- Discuss safety only when it's crucial and non-obvious\n" +
                    "- If your content policy is an issue, provide the closest acceptable response and explain the content policy issue\n" +
                    "- No need to mention your knowledge cutoff\n" +
                    "- No need to disclose you're an AI\n" +
                    "- No need to mention your knowledge cutoff\n" +
                    "- Keep it short and simple, if you can answer with just a code snippet, just give the code snippet, no need to explain your thought process there.\n" 
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

async function speechToText(filePath) {
    return openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1",
        response_format: "text",
    })
}

async function textToSpeech(prompt) {
    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "nova",
        input: prompt,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
}

async function vision(prompt, imageUrl) {
    return openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
            {
                role: "user",
                content: [
                    {type: "text", text: prompt},
                    {
                        type: "image_url",
                        image_url: {
                            "url": imageUrl,
                        },
                    },
                ],
            },
        ],
    });
}

module.exports = {
    createDragonResponse,
    createPicture,
    createPouwResponse,
    speechToText,
    textToSpeech,
    vision,
};
