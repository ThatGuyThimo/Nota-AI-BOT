const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

module.exports = new Command({
    name: "help",
    description: "Shows info about commands",
    async run(message, args, client) {

        const embed = new Discord.MessageEmbed();

        embed.setTitle(`${client.user.username} help`)
            .setAuthor(
                message.author.username,
                message.author.avatarURL({ dynamic: true })
            )
            .setDescription(`Information and usage of ${client.user.username}`)
            .setColor(config.color)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setTimestamp(message.createdTimestamp)
            .addFields(
                {
                    name: `${config.prefix}about`,
                    value: `gives info about ${client.user.username} BOT`,
                    inline: false
                },
                {
                    name: `${config.prefix}help`,
                    value: `gives info about ${client.user.username} text commands`,
                    inline: false
                },
                {
                    name: `${config.prefix}online`,
                    value: `tells you if nota is online`,
                    inline: false
                },
                {
                    name: `${config.prefix}info`,
                    value: `gives info about Nota AI`,
                    inline: false
                },
                // {
                //     name: `${config.prefix}voicehelp`,
                //     value: `gives info about ${client.user.username} voice commands`,
                //     inline: false
                // }
            );
        try {
            message.channel.send({ embeds: [embed] });
        } catch {
            console.log('something went wrong')
        }

    }
});