const SlashCommand = require("../Structures/SlashCommand.js");

const { banUser } = require("../Classes/vrchat.js");

module.exports = new SlashCommand({
    name: "banuser",
    description: "bans the user from the nota ai vrchat group, takes vrchatid or discordid",
    options: [{
        name: "userid",
        description: "enter the users discord id or vrchat id you want to ban",
        type: 3,
        required: true
    },
    ],

    async run(message, args, client) {
        try {
            result = await banUser(args[0].value)

            message.reply(`${result}`);
        } catch(error) {
            message.reply('Something went wrong')
        }

    }

});