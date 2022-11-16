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
                message.user.username,
                message.user.avatarURL()
            )
            .setDescription(`Information about ${client.user.username}`)
            .setColor(config.color)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setTimestamp(message.createdTimestamp)
            .addFields(
                {
                    name: "Bot Version",
                    value: "0.0.7",
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
        try {
            message.reply({ embeds: [embed] });
        } catch {
            console.log('something went wrong')
        }

    }
});