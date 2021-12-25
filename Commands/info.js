const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

const { online } = require("../Classes/vrchat.js");

module.exports = new Command({
    name: "info",
    description: "gives you info about nota",

    async run(message, args, client) {
        data = await online()

        const embed = new Discord.MessageEmbed();

        embed.setTitle(`About Nota AI,`)
            .setAuthor(
                message.author.username,
                message.author.avatarURL({ dynamic: true })
            )
            .setDescription(`Information about Nota AI`)
            .setColor(config.color)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setTimestamp(message.createdTimestamp)
            .addFields(
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
                    value: `${data.location}`,
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
            );

        message.channel.send({ embeds: [embed] });

        
        console.log(data);
    }

});