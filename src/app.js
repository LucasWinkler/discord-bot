// The apps config
const config = require("../config.json");

// The needed packages
const discord = require("discord.js");
const moment = require("moment");
const giphy = require("giphy-js-sdk-core")(config.giphy.key);

// New instance of the discord client
const client = new discord.Client();

// Listens for the ready event
client.on("ready", () => {
  client.user.setActivity("Fartnite");
  return console.log(`${client.user.username} is now online!`);
});

// Event triggered when someone joins the channel
client.on("guildMemberAdd", member => {
  // Finds the channel to send a welcome message to
  const channel = member.guild.channels.find(ch => ch.name === "member-log");

  // If the channel wasn't found then return
  if (!channel) return;

  return channel.send(`Welcome to the server, ${member}`);
});

// Event triggered when someone leaves
client.on("guildMemberRemove", member => {
  // Finds the channel to send a goodbye message to
  const channel = member.guild.channels.find(ch => ch.name === "member-log");

  if (!channel) return;

  return channel.send(`Goodbye, ${member}`);
});

// Listens for any messages sent in the channel
client.on("message", async message => {
  // Returns if the sender is the bot
  const sender = message.author;
  if (sender.bot) return;

  // The message and the prefix
  const msg = message.content;
  const prefix = config.prefix;

  // Return if the message does not start with the command prefix
  if (!msg.startsWith(prefix)) return;

  // Log command to console
  console.log(
    `[${moment().format("M/D/YYYY, h:mm:ss a")}] ${sender.username}: '${msg}'`
  );

  // Senders command and any arguments
  const arg = msg.substring(prefix.length).split(" ");
  const cmd = arg[0].toUpperCase();

  // The channel that the message was sent in
  const chnl = message.channel;

 // Ping/Pong command
  if (cmd === "PING") {    
    return chnl.send("Pong!");
  }

  if (cmd === "HELLO") {
    return chnl.send(`Hello ${sender.username}!`);
  }

  // Finds a random gif with an optional tag
  if (cmd === "RGIF") {
    arg.shift();
    const tag = arg.join(" ");

    giphy
      .random("gifs", {
        tag: tag
      })
      .then(response => {
        return chnl.send(response.data.url);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Clears the last 100 messages sent in the channel
  if (cmd === "CLEAR") {
    chnl.fetchMessages()
      .then(fetchedMessages => {
        return chnl.bulkDelete(fetchedMessages);
      });
  }
});

// Connects the client using the auth token set in the config.js
client.login(config.token);