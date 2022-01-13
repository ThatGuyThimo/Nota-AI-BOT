const Command = require("../Structures/Command.js");

const { online } = require("../Classes/vrchat.js");

module.exports = new Command({
    name: "online",
    description: "tells you if nota is online",

    async run(message, args, client) {
        data = await online()

        message.reply(`Nota AI is ${data.state}`);
    }

});