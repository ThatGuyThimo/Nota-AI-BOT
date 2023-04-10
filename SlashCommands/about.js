const SlashCommand = require("../Structures/SlashCommand.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

const { sendErrorDC } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "about",
    description: "shows info about the bot",
    async run(message, args, client) {

        // const embed = new Discord.MessageEmbed();
        const embed = new Discord.EmbedBuilder()

            .setTitle(`About ${client.user.username},`)
            .setAuthor({
                name : message.user.tag,
                iconURL : message.user.avatarURL()
            })
            .setDescription(`Information about ${client.user.username}`)
            .setColor(config.color)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .addFields([
                {
                    name: "Bot Version",
                    value: "0.1.3",
                    inline: false
                },
                {
                    name: "Bot name",
                    value: client.user.username,
                    inline: false
                },
                {
                    name: "Code",
                    value: "Written in javascript using discord.js version 14.7.1",
                    inline: false
                },
                {
                    name: "Contributer",
                    value: "-Thimo-",
                    inline: false
                },
            ]);
        try {
            message.reply({ embeds: [embed] });
        } catch(error) {
            sendErrorDC(client, message, "about", error)
            console.log('something went wrong')
        }

    }
});