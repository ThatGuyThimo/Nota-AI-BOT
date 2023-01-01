const SlashCommand = require("../Structures/SlashCommand.js");

const { banUser } = require("../Classes/vrchat.js");

const Discord = require("discord.js");

module.exports = new SlashCommand({
    name: "banuser",
    description: "bans the user from the nota ai vrchat group, takes vrchatid or discordid",
    default_member_permissions: Discord.PermissionFlagsBits.Administrator,
    options: [{
        name: "userid",
        description: "enter the users discord id or vrchat id you want to ban",
        type: 3,
        required: true
    },
    ],

    async run(message, args, client) {
        try {
            try {
                result = await banUser(args[0].value)
    
                message.reply(`${result}`);
            } catch(error) {
                message.reply('Something went wrong')
            }            
        } catch(error) {
            console.warn(error)
            message.reply('Something went wrong')
        }
    }
});