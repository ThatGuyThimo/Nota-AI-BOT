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
     * @typedef {{name: string, description: string, run: RunFunction}} CommandOptions
     * @param {CommandOptions} options 
     */
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.run = options.run;
    }
}

module.exports = SlashCommand;