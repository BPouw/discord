const { Events } = require('discord.js');
const openai = require('../data/openai_client');
const ogg = require('../services/ogg_service');

module.exports = {
    name: Events.MessageCreate,
    async execute(interaction) {
        if (interaction.guild || interaction.author.bot) return;

        let response;

        if (interaction.author.username === 'pouw') {
            response = await handleUserResponse(interaction, openai.createPouwResponse);
        } else {
            response = await handleUserResponse(interaction, openai.createDragonResponse);
        }

        await sendResponseViaDM(interaction, response);
    },
};

async function handleUserResponse(interaction, responseFunction) {
    for (const [attachmentId, attachment] of interaction.attachments) {
        if (attachment.contentType === 'audio/ogg') {
            const attachmentUrl = attachment.url;
            const filepath = './data/audiofile.ogg';
            await ogg.downloadAndSaveOggFile(attachmentUrl, filepath);
            const transcription = await openai.speechToText(filepath);
            const response = await openai.createPouwResponse(transcription.toString());
            await openai.textToSpeech(response.choices[0].message.content);
            return "voice"
        }

        if (attachment.contentType.includes('image')) {
            if(interaction.content) {
                return openai.vision(interaction.content, attachment.url);
            } else {
                return openai.vision("What’s in this image?", attachment.url)
            }
        }
    }

    if (interaction.content) {
        return await responseFunction(interaction.content);
    }

    return "Non supported document type"
}

async function sendResponseViaDM(interaction, message) {
    if (message) {
        if(message === "voice") {
            await interaction.author.send({files:
                [
                    "data/speech.mp3"
                ]}).catch(() => {
                console.log('Not authorized to DM this user');
            });
        } else {
            try {
                await interaction.author.send(message.choices[0].message.content).catch(() => {
                    console.log('Not authorized to DM this user');
                });
            } catch (e) {
                console.log('Wrong file type exception');
            }

        }
    }
}
