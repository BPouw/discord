require('dotenv').config()

module.exports = {
    token: process.env.BOT_TOKEN,
    channel: "https://www.youtube.com/channel/UC1S0oihI1QWCCGSFo1OiJKg?view_as=subscriber",
    messageTemplate: "No way a new Pouw video,\n **{title}**!\n{url}",
    channel_id: "UC1S0oihI1QWCCGSFo1OiJKg",
    watchInterval: 30000
}