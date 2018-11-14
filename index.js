const {Client} = require("discord.js")
const config = require('./config.json')

const client = new Client()

client.on("ready", () => {
  console.log(`Bot is ready to serve ${client.users.size} users on ${client.guilds.size} servers`)
  main()
})

function main() {
    setTimeout(() => {
      client.channels.get(config.channel).send(config.message)
      console.log("Message sent!")
      main()
    }, config.minutes * 60000)
  }

client.login(config.token)