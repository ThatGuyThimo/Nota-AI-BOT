const Discord = require("discord.js");

const Client = require("./Client.js");

/**
 * @template {key of Discord.ClientEvents} K
 * @param {Client} client 
 * @param {Discord.ClientEvents[K]} eventArgs 
 */
function RunFunction(client, ...eventArgs) {};

/**
 * @template {key of Discord.ClientEvents} K
 */
class Event {
    /**
     * 
     * @param {K} event 
     * @param {RunFunction<K>} runFunction 
     */
    constructor(event, runFunction) {
        this.event = event;
        this.run = runFunction;
    }
}

module.exports = Event;