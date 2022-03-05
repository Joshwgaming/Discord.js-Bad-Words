const { Client, Intents, MessageEmbed } = require('discord.js');
const { botToken } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.login(botToken);

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});


const badLinksAutoMod = require('./badLinks.js');
badLinksAutoMod(client, Client, MessageEmbed)
