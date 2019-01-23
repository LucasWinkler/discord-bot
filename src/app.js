// The apps config
const config = require("../config");

// The needed packages
const discord = require("discord.js");
const moment = require("moment");
const giphy = require("giphy-js-sdk-core")(config.giphy.api_key);

// New instance of the discord client
const client = new discord.Client();

// Listens for the ready event
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event triggered when someone joins the channel
client.on("guildMemberAdd", member => {
  // Finds the channel to send a welcome message to
  const channel = member.guild.channels.find(ch => ch.name === "member-log");

  // If the channel wasn't found then return
  if (!channel) return;

  channel.send(`Welcome to the server, ${member}`);
});

// Event triggered when someone leaves
client.on("guildMemberRemove", member => {
  // Finds the channel to send a goodbye message to
  const channel = member.guild.channels.find(ch => ch.name === "member-log");

  if (!channel) return;

  channel.send(`Goodbye, ${member}`);
});

// Listens for any messages sent in the channel
client.on("message", async message => {
  // If the sender of the message is the bot then return
  let sender = message.author;
  if (sender.equals(client.user)) return;

  // If the msg does not start with the prefix then return
  let msg = message.content;
  if (!msg.startsWith(config.discord.prefix)) return;

  // Log command to console
  console.log(
    `[${moment().format("M/D/YYYY, h:mm:ss a")}] ${sender.username}: '${msg}'`
  );

  let arg = msg.substring(config.discord.prefix.length).split(" ");
  let cmd = arg[0].toUpperCase();

  // Ping/pong
  if (cmd === "PING") {
    message.channel.send("Pong!");
  }

  // Finds a random gif with an optional tag
  if (cmd === "RGIF") {
    arg.shift();
    let tag = arg.join(" ");

    giphy
      .random("gifs", {
        tag: tag
      })
      .then(response => {
        message.channel.send(response.data.url);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Clears the last 100 messages sent in the channel
  if (cmd === "CLEAR") {
    message.channel.fetchMessages().then(fetchedMessages => {
      message.channel.bulkDelete(fetchedMessages);
    });
  }
});

// Connects the client using the auth token set in the config.js
client.login(config.discord.token);
