const SlashCommand = require("../Structures/SlashCommand.js");

const { online } = require("../Classes/vrchat.js");

module.exports = new SlashCommand({
    name: "online",
    description: "tells you if nota is online",

    async run(message, args, client) {
        try {
            data = await online()

            message.reply(`Nota AI is ${data.state}`);
        } catch(error) {
            console.warn(error)
            message.reply('Something went wrong.')
        }

    }

});