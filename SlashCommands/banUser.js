const SlashCommand = require("../Structures/SlashCommand.js");

const { joinGroup } = require("../Classes/vrchat.js");

module.exports = new SlashCommand({
    name: "banuser",
    description: "bans the user from discord and removes him from the nota ai vrchat group",
    options: [{
        name: "discordid",
        description: "enter the users discord id you want to ban",
        type: 3,
        required: true
    },
    ],

    async run(message, args, client) {
        try {
            result = await joinGroup(args[0].value, message)

            message.reply(`Ran joinGroups() result: ${result}`);
        } catch(error) {
            console.warn(error)
            message.reply('Something went wrong')
        }

    }

});