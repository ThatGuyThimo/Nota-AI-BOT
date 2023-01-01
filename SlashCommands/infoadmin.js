const SlashCommand = require("../Structures/SlashCommand.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

const { online, getWorld, getInstance } = require("../Classes/vrchat.js");

module.exports = new SlashCommand({
    name: "infoadmin",
    description: "gives you info about nota",
    default_member_permissions: Discord.PermissionFlagsBits.Administrator,

    async run(message, args, client) {
        try {

            data = await online()
    
                await getWorld(data.worldId).then(async function(world) {
                    
                    await getInstance(data.worldId, data.instanceId).then(instance => {
                        
                        const embed = new Discord.EmbedBuilder()
                        .setTitle(`About Nota AI,`)
                        .setAuthor({
                            name : message.user.tag,
                            iconURL : message.user.avatarURL()
                        })
                        .setDescription(`Information about Nota AI`)
                        .setColor(config.color)
                        .setThumbnail(client.user.avatarURL({ dynamic: true }))
                        .setTimestamp()
                        .addFields([
                            {
                                name: "date joined",
                                value: `${data.date_joined}`,
                                inline: false
                            },
                            {
                                name: "status",
                                value: `${data.status}`,
                                inline: false
                            },
                            {
                                name: "location",
                                value: `[${world.name}#${instance.name}](https://vrchat.com/home/launch?worldId=${data.worldId}&instanceId=${data.instanceId})`,
                                inline: false
                            },
                            {
                                name: "worldID",
                                value: `${data.worldId}`,
                                inline: false
                            },
                            {
                                name: "instanceID",
                                value: `${data.instanceId}`,
                                inline: false
                            },
                            {
                                name: "online status",
                                value: `${data.state}`,
                                inline: false
                            },
                            {
                                name: "Last_Login",
                                value: `${data.last_login}`,
                                inline: false
                            },
                            {
                                name: "StatusDescription",
                                value: `${data.statusDescription}`,
                                inline: false
                            },
                            {
                                name: "Bio",
                                value: `${data.bio}`,
                                inline: false
                            }
                        ]);
                    try {
                        message.reply({ embeds: [embed] });
                    } catch(error) {
                        message.reply("Something went wrong")
                    }
                });
            }).catch(error => {
                message.reply("Something went wrong")
            });
    } catch(error) {
        console.warn(error)
        message.reply('Something went wrong')
    }
}

});