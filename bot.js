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
        if (msg.content == "race check") {
        msg.reply(":monkasteer: :monkasteer: :monkasteer: :monkasteer:")
    }
})




client.login(process.env.BOT_TOKEN)
