const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

const { online, getWorld, getInstance } = require("../Classes/vrchat.js");

module.exports = new Command({
    name: "invite",
    description: "creates an invite to notas world",

    async run(message, args, client) {
        try {
            data = await online()
        
            if (data.state == "online") {
                if(message.member.roles.cache.some(role => role.name === '🍔TRUSTED-BORGER🍔') || message.member.permissions.has("ADMINISTRATOR") ) {
                    const embed = new Discord.MessageEmbed();
                    const world = await getWorld(data.worldId);
                    const instance = await getInstance(data.worldId, data.instanceId);
        
                    embed.setTitle(`Invite link`)
                        .setAuthor(
                            message.user.username,
                            message.user.avatarURL()
                        )
                        .setDescription(`generated invite link to nota`)
                        .setColor(config.color)
                        .setThumbnail(client.user.avatarURL({ dynamic: true }))
                        .setTimestamp(message.createdTimestamp)
                        .addFields(
                            {
                                name: "location",
                                value: `[${world.name}#${instance.name}](https://vrchat.com/home/launch?worldId=${data.worldId}&instanceId=${data.instanceId})`,
                                inline: false
                            }
                        );
                    try {
                        message.reply({ embeds: [embed] });
        
                } catch(error) {
                    console.warn(error)
                    message.reply("Something went wrong")
                }
            } else {
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`❗No permission❗`)
                .setDescription(`Ask users with the <@&930647071260823584> role to use this command.`)
                .setColor(config.color)
        
                try {
                    message.reply({ embeds: [embed] });
                } catch(error) {
                    console.warn(error)
                    message.reply("Something went wrong")
                }
            }
        } else {
            message.reply("invite not created Nota is offline");
        }
    } catch(error) {
    console.warn(error)
    message.reply("Something went wrong")
    }
}

});