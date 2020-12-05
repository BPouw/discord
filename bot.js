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
        msg.reply("<a:monkasteer:784531240858419240> <a:monkasteer:784531240858419240> <a:monkasteer:784531240858419240> <a:monkasteer:784531240858419240>")
    }
})




client.login(process.env.BOT_TOKEN)
