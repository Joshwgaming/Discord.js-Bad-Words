const { clientId, guildId, modLogsChannelID } = require('../config.json');
const badWordsTier1 = require('./badWordsTier1.json');
const badWordsTier2 = require('./badWordsTier2.json');
const badWordsTier3 = require('./badWordsTier3.json');

module.exports = (client, Client, MessageEmbed) => {
    client.on('messageCreate', async (message) => {
        if (message.channel.type === 'DM') {
            return;
        } else {
            if (message.author.id === clientId) {
                return;
            } else {
                if (message.guild.id === guildId) {

                    const modLogs = client.channels.cache.get(modLogsChannelID); //the channel you want moderation logs posted to
                    const guild = client.guilds.cache.get(message.guildId);

                    async function tier1Punishment(userID, message) { // timeout 28d
                        const target = guild.members.cache.get(userID)

                        target.timeout(2419100000, "Tier 1 Bad Words automod - 28D timeout")

                        message.delete()

                        const t1Embed = new MessageEmbed()
                            .setTitle("Member Warned:")
                            .addFields(
                                { name: "**" + "Username:" + "**", value: target.user.tag, inline: false },
                                { name: "**" + "Account ID" + "**", value: target.user.id, inline: false },
                                { name: "**" + "Reason" + "**", value: `Tier 1 Bad Words AutoMod`, inline: false },
                                { name: "**" + "Mute Duration" + "**", value: `28 Days`, inline: false },
                                { name: "**" + "Muted On:" + "**", value: new Date().toLocaleDateString() + " @ " + new Date().toLocaleTimeString(), inline: false },
                                { name: "**" + "Muted By:" + "**", value: client.user.tag, inline: false },
                            )
                            .setColor("#ff0d00")
                        modLogs.send({ embeds: [t1Embed] })
                    }

                    async function tier2Punishment(userID, message) { //timeout 1h
                        const target = guild.members.cache.get(userID)

                        target.timeout(3600000, "Tier 2 Bad Words automod - 1h timeout") //3600000

                        message.delete()

                        const t2Embed = new MessageEmbed()
                            .setTitle("Member Warned:")
                            .addFields(
                                { name: "**" + "Username:" + "**", value: target.user.tag, inline: false },
                                { name: "**" + "Account ID" + "**", value: target.user.id, inline: false },
                                { name: "**" + "Reason" + "**", value: `Tier 2 Bad Words AutoMod`, inline: false },
                                { name: "**" + "Mute Duration" + "**", value: `1 Hour`, inline: false },
                                { name: "**" + "Muted On:" + "**", value: new Date().toLocaleDateString() + " @ " + new Date().toLocaleTimeString(), inline: false },
                                { name: "**" + "Muted By:" + "**", value: client.user.tag, inline: false },
                            )
                            .setColor("#ff0d00")
                        modLogs.send({ embeds: [t2Embed] })
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
                        modLogs.send({ embeds: [t3Embed] })
                    }
                        
                        if (badWordsTier1.includes(message.content)) {
                            console.log("tier 1")
                            tier1Punishment(message.author.id, message)
                        } else if (badWordsTier2.includes(message.content)) {
                            console.log("tier 2")
                            tier2Punishment(message.author.id, message)
                        } else if (badWordsTier3.includes(message.content)) {
                            console.log("tier 3")
                            tier3Punishment(message.author.id, message)
                        } else {
                            return;
                        }
                    }
                }
            }
    });
 }
