const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

module.exports = new Command({
    name: "about",
    description: "shows info about the bot",
    async run(message, args, client) {

        const embed = new Discord.MessageEmbed();

        embed.setTitle(`About ${client.user.username},`)
            .setAuthor(
                message.author.username,
                message.author.avatarURL({ dynamic: true })
            )
            .setDescription(`Information about ${client.user.username}`)
            .setColor(config.color)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setTimestamp(message.createdTimestamp)
            .addFields(
                {
                    name: "Bot Version",
                    value: "0.0.1",
                    inline: false
                },
                {
                    name: "Bot name",
                    value: client.user.username,
                    inline: false
                },
                {
                    name: "Code",
                    value: "Written in javascript using discord.js version 13.3.1",
                    inline: false
                },
                {
                    name: "Contributer",
                    value: "-Thimo-",
                    inline: false
                },
            );

        message.channel.send({ embeds: [embed] });

    }
});