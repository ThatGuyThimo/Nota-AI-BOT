const SlashCommand = require("../Structures/SlashCommand.js");

module.exports = new SlashCommand({
    name: "erp",
    description: "no no no no no",

    async run(message, args, client) {

        message.reply(`https://imgur.com/a/LO2d1sb`);
    }

});