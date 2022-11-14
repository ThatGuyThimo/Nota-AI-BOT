const Event = require("../Structures/Event.js");

const { onlineping } = require("../Classes/vrchat.js");

module.exports = new Event("ready", client => {
    console.log(`Discord Logged in as: ${client.user.tag}`);
    client.user.setActivity("/help");
    setInterval(() => onlineping(client), 60000)
});