const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

const { online, getWorld } = require("../Classes/vrchat.js");

module.exports = new Command({
    name: "invite",
    description: "creates an invite to notas world",

    async run(message, args, client) {
        data = await online()
        // console.log(data)

        if (data.state == "online") {
            if(message.member.roles.cache.some(role => role.name === '🍔TRUSTED-BORGER🍔') || message.member.permissions.has("ADMINISTRATOR") ) {

            const embed = new Discord.MessageEmbed();
            const world = await getWorld(data.worldId);
            const instance = await getInstance(data.worldId, data.instanceId);


            embed.setTitle(`Invite link`)
                .setAuthor(
                    message.author.username,
                    message.author.avatarURL({ dynamic: true })
                )
                .setDescription(`generated invite link to nota`)
                .setColor(config.color)
                .setThumbnail(client.user.avatarURL({ dynamic: true }))
                .setTimestamp(message.createdTimestamp)
                .addFields(
                    {
                        name: `Location`,
                        value: `[${world.name}#${instance.name}](https://vrchat.com/home/launch?worldId=${data.worldId}&instanceId=${data.instanceId})`,
                        inline: false
                    }
                );
            try {
                message.channel.send({ embeds: [embed] });
            } catch {
                console.log('something went wrong')
            }
        } else {
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`❗No permission❗`)
            .setDescription(`Ask users with the <@&930647071260823584> role to use this command.`)
            .setColor(config.color)

            try {
                message.channel.send({ embeds: [embed] });
            } catch {
                console.log('something went wrong')
            }
        }
    } else {
        message.channel.send("invite not created Nota is offline");
    }
}

});