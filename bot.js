require('dotenv').config()

const Discord = require("discord.js")
const client = new Discord.Client()

client.on("ready", () => {
    console.log("The dragon awakens")
})

client.on("message", msg => {
    if (msg.content == "ping") {
        msg.reply("Pong!")
    }
    if (msg.content == "good bot") {
        msg.react("❤️")
        msg.react("🐉")
    }
})

function handleUploads() {
    if (client.db.fetch(`postedVideos`) === null) client.db.set(`postedVideos`, []);
    setInterval(() => {
        client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.config.channel_id}`)
        .then(data => {
            if (client.db.fetch(`postedVideos`).includes(data.items[0].link)) return;
            else {
                client.db.set(`videoData`, data.items[0]);
                client.db.push("postedVideos", data.items[0].link);
                let parsed = client.db.fetch(`videoData`);
                let channel = client.channels.cache.get(client.config.channel);
                if (!channel) return;
                let message = client.config.messageTemplate
                    .replace(/{author}/g, parsed.author)
                    .replace(/{title}/g, Discord.Util.escapeMarkdown(parsed.title))
                    .replace(/{url}/g, parsed.link);
                channel.send(message);
            }
        });
    }, client.config.watchInterval);
}



client.login(process.env.BOT_TOKEN)
