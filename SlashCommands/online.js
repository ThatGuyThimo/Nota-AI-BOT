const SlashCommand = require("../Structures/SlashCommand.js");

const { online } = require("../Classes/vrchat.js");

const { sendErrorDC } = require("../Classes/errorLogging.js");

module.exports = new SlashCommand({
    name: "online",
    description: "tells you if nota is online",

    async run(message, args, client) {
        try {
            data = await online()

            message.reply(`Nota AI is ${data.state}`);
        } catch(error) {
            sendErrorDC(client, message, "online", error)
            message.reply('Something went wrong.')
        }

    }

});