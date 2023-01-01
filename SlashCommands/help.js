const SlashCommand = require("../Structures/SlashCommand.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

module.exports = new SlashCommand({
    name: "help",
    description: "Shows info about commands",
    async run(message, args, client) {

        const embed = new Discord.EmbedBuilder()

            .setTitle(`${client.user.username} help`)
            .setAuthor({
                name : message.user.tag,
                iconURL : message.user.avatarURL()
            })
            .setDescription(`Information and usage of ${client.user.username}`)
            .setColor(config.color)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .addFields([
                {
                    name: `/about`,
                    value: `gives info about ${client.user.username} BOT`,
                    inline: false
                },
                {
                    name: `/help`,
                    value: `gives info about ${client.user.username} text commands`,
                    inline: false
                },
                {
                    name: `$/online`,
                    value: `tells you if nota is online`,
                    inline: false
                },
                {
                    name: `/invite`,
                    value: `generates an invite link to nota only workes for users with the role <@&930647071260823584>`,
                    inline: false
                },
                {
                    name: `$/info`,
                    value: `gives info about Nota AI`,
                    inline: false
                }
            ]);
        try {
            message.reply({ embeds: [embed] });
        } catch {
            console.log('something went wrong')
        }

    }
});