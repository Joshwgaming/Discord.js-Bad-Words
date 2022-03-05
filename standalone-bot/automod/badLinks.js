const { LoggingChannelID } = require('../config.json');
const badWordsTier1 = require('./badWordsTier1.json');
const badWordsTier2 = require('./badWordsTier2.json');
const badWordsTier3 = require('./badWordsTier3.json');

module.exports = (client, Client, MessageEmbed) => { 
    client.on('messageCreate', async (message) => {
        console.log(message)

        if (message.channel.type === 'DM') { //ignore bad words in DM's
            return;
        }
        if (message.author.id === client.id) { //ignore bad words through the bot - prevents the bot muting itself
            return;
        }

        const logsChannel = client.channels.cache.get(LoggingChannelID); //find channel moderation logs are posted to. Remove if not needed
        const guild = client.guilds.cache.get(message.guildId);

        async function tier1Punishment(userID, message) { // timeout 28d
            const target = guild.members.cache.get(userID)

            target.timeout(2419100000, "Tier 1 Bad Words AutoMod - 28d Timeout")

            message.delete()

            const t1Embed = new MessageEmbed()
                .setTitle("Member Muted:")
                .addFields(
                    { name: "**" + "Username:" + "**", value: target.user.tag, inline: false },
                    { name: "**" + "Account ID" + "**", value: target.user.id, inline: false },
                    { name: "**" + "Reason" + "**", value: `Tier 1 Bad Words AutoMod`, inline: false },
                    { name: "**" + "Mute Duration" + "**", value: `28 Days`, inline: false },
                    { name: "**" + "Muted On:" + "**", value: new Date().toLocaleDateString() + " @ " + new Date().toLocaleTimeString(), inline: false },
                    { name: "**" + "Muted By:" + "**", value: client.user.tag, inline: false },
                )
                .setColor("#ff0d00")
            logsChannel.send({ embeds: [t1Embed] })
        }

        async function tier2Punishment(userID, message) { //timeout 1h
            const target = guild.members.cache.get(userID)

            target.timeout(3600000, "Tier 2 Bad Words AutoMod - 1h Timeout") //3600000

            message.delete()

            const t2Embed = new MessageEmbed()
                .setTitle("Member Muted:")
                .addFields(
                    { name: "**" + "Username:" + "**", value: target.user.tag, inline: false },
                    { name: "**" + "Account ID" + "**", value: target.user.id, inline: false },
                    { name: "**" + "Reason" + "**", value: `Tier 2 Bad Words AutoMod`, inline: false },
                    { name: "**" + "Mute Duration" + "**", value: `1 Hour`, inline: false },
                    { name: "**" + "Muted On:" + "**", value: new Date().toLocaleDateString() + " @ " + new Date().toLocaleTimeString(), inline: false },
                    { name: "**" + "Muted By:" + "**", value: client.user.tag, inline: false },
                )
                .setColor("#ff0d00")
            logsChannel.send({ embeds: [t2Embed] })
        }

        async function tier3Punishment(userID, message) { //delete + warn
            const target = guild.members.cache.get(userID)

            message.delete()

            const t3Embed = new MessageEmbed()
                .setTitle('**' + 'Member Warned:' + '**')
                .addFields(
                    { name: "**" + "Username:" + "**", value: target.user.tag, inline: false },
                    { name: "**" + "Account ID" + "**", value: target.user.id, inline: false },
                    { name: "**" + "Warned On:" + "**", value: new Date().toLocaleDateString() + " @ " + new Date().toLocaleTimeString(), inline: false },
                    { name: "**" + "Warned By:" + "**", value: client.user.tag, inline: false },
                    { name: "**" + "Reason:" + "**", value: "Tier 3 Bad Links AutoMod", inline: false },
                )
                .setColor("#ff0d00");
            logsChannel.send({ embeds: [t3Embed] })
        }

        if (badWordsTier1.includes(message.content)) {
            console.log("Bad Words AutoMod Tier 1")
            tier1Punishment(message.author.id, message)
        } else if (badWordsTier2.includes(message.content)) {
            console.log("Bad Words AutoMod Tier 2")
            tier2Punishment(message.author.id, message)
        } else if (badWordsTier3.includes(message.content)) {
            console.log("Bad Words AutoMod Tier 3")
            tier3Punishment(message.author.id, message)
        } else {
            return;
        }
    })
}
