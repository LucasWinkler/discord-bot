// The apps config
const config = require('../config')

// The discord.js package and the client
const Discord = require('discord.js');
const client = new Discord.Client();

// Command prefix
const prefix = '!';

// Listens for the ready event
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Listens for any messages sent in the server
client.on('message', message => {
    let msg = message.content.toUpperCase();

    // Simple "Ping/Pong" command.
    if (msg === prefix + 'PING') {
        message.reply('Pong!');
    }
});

// Connects the client using the auth token set in the config.js
client.login(config.token);