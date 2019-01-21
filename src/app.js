// The apps config
const config = require('../config')

// The needed packages
const discord = require('discord.js');
const moment = require('moment');
const giphy = require('giphy-js-sdk-core')("X7R9jS61fwGTofIhsSG3OeJKq0kpLQjf");

// New instance of the discord client
const client = new discord.Client();
//const giphyClient = giphy();

// Command prefix
const prefix = '!';

// Listens for the ready event
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event is triggered when someone joins the channel
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(
        ch => ch.name === 'member-log');
        
    if (!channel) return;

    channel.send(`Welcome to the server, ${member}`);
});

// Event triggered when someone leaves
client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find(
        ch => ch.name === 'member-log');

        if (!channel) return;
        
        channel.send(`Goodbye, ${member}`);
});

// Listens for any messages sent in the server
client.on('message', message => {
    let msg = message.content.toUpperCase();
    let author = message.author;

    // Log messages to console if not this client
    if (author != client.user) console.log(`[${moment().format('M/D/YYYY, h:mm:ss a')}] ${author.username}: '${message.content}'`);

    if (msg === prefix + 'PING') {
        message.channel.send('Pong!');
    }

    if (msg === prefix + 'RGIF') {
        giphy.random('gifs', {"tag": 'pizza'})
            .then((response) => {
                   message.channel.send(response.data.url);
            })
            .catch((err) => {
                console.log(err); 
            });
    }
});

// Connects the client using the auth token set in the config.js
client.login(config.auth.token);