const SlashCommand = require("../Structures/SlashCommand.js");

const { unbanUser } = require("../Classes/vrchat.js");

const { sendErrorDC } = require("../Classes/errorLogging.js");

const config = require("../Data/config.json");

const Discord = require("discord.js");

module.exports = new SlashCommand({
    name: "unbanuser",
    description: "unbans the user from the nota ai vrchat group, takes vrchatid or discordid",
    default_member_permissions: Discord.PermissionFlagsBits.Administrator,
    options: [{
        name: "userid",
        description: "enter the users discord id or vrchat id you want to unban",
        type: 3,
        required: true
    },
    ],

    async run(message, args, client) {
        try {

        const role = await message.guild.roles.fetch('923464931628683264')
        const member = await message.guild.members.cache.get(message.user.id)

        if(await member.roles.cache.has('923464931628683264')) {
        
            let result = await unbanUser(args[0].value)
            result = await JSON.parse(result)

            if (result.result == "User unbanned") {

                const fetchedMember = await message.guild.members.fetch(result.dcID);

                const embed = new Discord.EmbedBuilder()

                .setTitle(`Unbanned user ${fetchedMember.user.tag}`)
                .setAuthor({
                    name : message.user.tag,
                    iconURL : message.user.avatarURL()
                })
                .setColor(config.color)
                .setThumbnail(fetchedMember.user.avatarURL({ dynamic: true }))
                .setTimestamp()
                .addFields([
                    {
                        name: "Discord Name",
                        value: `${result.dcN}`,
                        inline: true
                    },
                    {
                        name: "Discord ID",
                        value: `${result.dcID}`,
                        inline: true
                    },
                    {
                        name: "Vrchat Name",
                        value: `${result.vrcN}`,
                        inline: true
                    },
                    {
                        name: "Vrchat ID",
                        value: `[${result.vrcID}](https://vrchat.com/home/user/${result.vrcID})`,
                        inline: true
                    },
                ]);
            try {
                message.reply({ embeds: [embed] });
            } catch(error) {
                sendErrorDC(client, message, "unbanUser", error)
                console.log('something went wrong, user still unbanned.')
            }
            } else {
                message.reply(`${result.result}`);
            }
        } else {
            message.reply('No permission.')
        }
        } catch(error) {
            console.log(error)
            sendErrorDC(client, message, "unbanUser", error)
            message.reply('Something went wrong, user still unbanned.')
        }            
    }
});