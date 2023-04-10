const SlashCommand = require("../Structures/SlashCommand.js");

const { sendErrorDC } = require("../Classes/errorLogging.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

const { online } = require("../Classes/vrchat.js");

module.exports = new SlashCommand({
    name: "info",
    description: "gives you info about nota",

    async run(message, args, client) {
        try {
            data = await online()
    
            const embed = new Discord.EmbedBuilder()

                .setTitle(`About Nota AI,`)
                .setAuthor({
                    name : message.user.tag,
                    iconURL : message.user.avatarURL()
                })
                .setDescription(`Information about Nota AI`)
                .setColor(config.color)
                .setThumbnail(client.user.avatarURL({ dynamic: true }))
                .setTimestamp()
                .addFields([
                    {
                        name: "Date joined",
                        value: `${data.date_joined}`,
                        inline: false
                    },
                    {
                        name: "Status",
                        value: `${data.status}`,
                        inline: false
                    },
                    {
                        name: "Online status",
                        value: `${data.state}`,
                        inline: false
                    },
                    {
                        name: "Last_Login",
                        value: `${data.last_login}`,
                        inline: false
                    },
                    {
                        name: "StatusDescription",
                        value: `${data.statusDescription}`,
                        inline: false
                    },
                    {
                        name: "Bio",
                        value: `${data.bio}`,
                        inline: false
                    },
                ]);
                
                message.reply({ embeds: [embed] });

        } catch(error) {
            console.warn(error)
            sendErrorDC(client, message, "info", error)
            message.reply('Something went wrong.')
        }
    }

});