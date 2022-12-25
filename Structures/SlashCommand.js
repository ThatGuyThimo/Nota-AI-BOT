const Discord = require("discord.js");

const Client = require("./Client.js");

/**
 * 
 * @param {Discord.message | Discord.Integration} message 
 * @param {String[]} args 
 * @param {Client} client 
 */
function RunFunction(message, args, client) {}


class SlashCommand {
    /**
     * @typedef {{name: string, description: string, options: Array, run: RunFunction}} CommandOptions
     * @param {CommandOptions} Coptions 
     */
    constructor(Coptions) {
        this.name = Coptions.name;
        this.description = Coptions.description;
        this.options = Coptions.options;
        this.run = Coptions.run;
    }
}

module.exports = SlashCommand;