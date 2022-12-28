const SlashCommand = require("../Structures/SlashCommand.js");

const { joinGroup } = require("../Classes/vrchat.js");

module.exports = new SlashCommand({
    name: "joingroup",
    description: "adds the user to the nota ai vrchat group",
    options: [{
        name: "username",
        description: "enter your vrchat username",
        type: 3,
        required: true
    },
    ],

    async run(message, args, client) {
        try {
            result = await joinGroup(args[0].value, message)

            message.reply(`${result}`);
        } catch(error) {
            console.warn(logError(error))
            message.reply('Something went wrong')
        }

    }

});