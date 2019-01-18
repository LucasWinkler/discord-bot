// The apps config
const config = require('../config')

// The discord.js package and the client
const Discord = require('discord.js');
const client = new Discord.Client();

// Listens for any messages sent in the server
client.on('message', message => {
    let sender = message.author; // The sender of the message
    let msg = message.content.toUpperCase(); // The senders message

    const prefix = '!'; // The character entered before a command

    // Simple "Ping/Pong" command.
    if (msg.toUpperCase() === prefix + 'PING') {
        message.channel.send('Pong!');
    }
});

// Connects the client using the auth token set in the config.js
client.login(config.token);