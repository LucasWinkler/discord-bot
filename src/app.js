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

// Event is triggered when someone joins the server
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(
        ch => ch.name === 'general');
        
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);
});

// Listens for any messages sent in the server
client.on('message', message => {
    let msg = message.content.toUpperCase();

    if (msg === prefix + 'PING') {
        message.channel.send('Pong!');
    }
});

// Connects the client using the auth token set in the config.js
client.login(config.auth.token);