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
    if (interaction.content) {
        return await responseFunction(interaction.content);
    }

    for (const [attachmentId, attachment] of interaction.attachments) {
        if (attachment.contentType === 'audio/ogg') {
            const attachmentUrl = attachment.url;
            const filepath = 'data/audiofile.ogg';
            await ogg.downloadAndSaveOggFile(attachmentUrl, filepath);
            const transcription = await openai.speechToText(filepath);
            return await responseFunction(transcription);
        }
    }
}

async function sendResponseViaDM(interaction, message) {
    if (message) {
        await interaction.author.send(message.choices[0].message.content).catch(() => {
            console.log('Not authorized to DM this user');
        });
    }
}
