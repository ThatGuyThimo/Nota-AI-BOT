const SlashCommand = require("../Structures/SlashCommand.js");

const { joinGroup } = require("../Classes/vrchat.js");
const { logError, sendErrorDC } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "joingroup",
    description: "adds the user to the nota ai vrchat group",
    options: [{
        name: "username",
        description: "enter your vrchat username",
        type: 3,
        required: true
    },],

    async run(message, args, client) {
        try {
            result = await joinGroup(args[0].value, message)
            message.reply(`${result}`);
        } catch(error) {
            console.warn(await logError(error))
            sendErrorDC(client, message, "joinGroup", error)
            message.reply('Something went wrong')
        }

    }

});