const SlashCommand = require("../Structures/SlashCommand.js");

// let {logout} = require("../Classes/vrchat.js")

module.exports = new SlashCommand({
    name: "erp",
    description: "no no no no no",

    async run(message, args, client) {

        // logout()

        // message.reply(`logged out`);
        message.reply(`https://imgur.com/a/LO2d1sb`);
    }

});