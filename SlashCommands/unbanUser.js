const SlashCommand = require("../Structures/SlashCommand.js");

const { unbanUser } = require("../Classes/vrchat.js");

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
        
            result = await unbanUser(args[0].value)

            message.reply(`${result}`);
        } else {
            message.reply('No permission.')
        }
        } catch(error) {
            console.log(error)
            message.reply('Something went wrong')
        }            
    }
});