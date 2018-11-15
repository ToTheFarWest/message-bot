const {Client} = require("discord.js")
const config = require('./config.json')

const client = new Client()

client.on("ready", () => {
  console.log(`Bot is ready to serve ${client.users.size} users on ${client.guilds.size} servers`)
})

function main() {
  setInterval(() => {
    const deadline = config.placeholder
    const t = getRemaining(config.deadline)
    const timeLeft = `${t.days} days ${t.hours} hours ${t.minutes} minutes and ${t.seconds} seconds`
    const message = config.message.replace(deadline, timeLeft)
    client.channels.get(config.channel).send(message)
    console.log("Message sent!")
  }, config.minutes * 60000)
}

function getRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor( (total/1000) % 60 );
  const minutes = Math.floor( (total/1000/60) % 60 );
  const hours = Math.floor( (total/(1000*60*60)) % 24 );
  const days = Math.floor( total/(1000*60*60*24) );
  return {
    total: total,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

client.login(config.token).then(() => {main()})