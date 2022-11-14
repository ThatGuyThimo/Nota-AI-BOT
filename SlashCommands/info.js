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
                message.user.username,
                message.user.avatarURL()
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
                    name: "online status",
                    value: `${data.state}`,
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