const SlashCommand = require("../Structures/SlashCommand.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

const { online, getWorld, getInstance } = require("../Classes/vrchat.js");

const { sendErrorDC } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "invite",
    description: "creates an invite to notas world",

    async run(message, args, client) {
        try {
            let data = await online()
        
            if (data.state == "online") {

                const role = await message.guild.roles.fetch('930647071260823584')
                const member = await message.guild.members.cache.get(message.user.id)

                    if(await member.roles.cache.has('930647071260823584')) {

                        const world = await getWorld(data.worldId);
                        const instance = await getInstance(data.worldId, data.instanceId);
                        const embed = new Discord.EmbedBuilder()
            
                        .setTitle(`Invite link`)
                        .setAuthor({
                            name : message.user.tag,
                            iconURL : message.user.avatarURL()
                        })
                        
                        .setDescription(`generated invite link to nota`)
                        .setColor(config.color)
                        .setThumbnail(client.user.avatarURL({ dynamic: true }))
                        .setTimestamp(message.createdTimestamp)
                        .addFields([
                            {
                                name: "location",
                                value: `[${world.name}#${instance.name}](https://vrchat.com/home/launch?worldId=${data.worldId}&instanceId=${data.instanceId})`,
                                inline: false
                            }
                        ]);

                        try {
                            message.reply({ embeds: [embed] });
            
                    } catch(error) {
                        console.warn(error)
                        sendErrorDC(client, message, "invite", error)
                        message.reply("Something went wrong")
                    }
                        
                } else {
                    const embed = new Discord.EmbedBuilder()
                    .setTitle(`❗No permission❗`)
                    .setDescription(`Ask users with the <@&930647071260823584> role to use this SlashCommand.`)
                    .setColor(config.color)
            
                    try {
                        message.reply({ embeds: [embed] });
                    } catch(error) {
                        console.warn(error)
                        sendErrorDC(client, message, "invite", error)
                        message.reply("Something went wrong")
                    }
                }
        } else {
            message.reply("invite not created Nota is offline");
        }
    } catch(error) {
    console.warn(error)
    sendErrorDC(client, message, "invite", error)
    message.reply("Something went wrong")
    }
}

});