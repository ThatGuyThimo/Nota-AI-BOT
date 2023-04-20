const Event = require("../Structures/Event.js");

const { onlineping } = require("../Classes/vrchat.js");

const colors = require('colors');

colors.enable();

module.exports = new Event("ready", client => {
    console.log(`Discord Logged in as: ${client.user.tag}`.green);
    client.user.setActivity("/help");
    try {
        setInterval(() => onlineping(client), 60000)
    } catch(error) {
        console.error(error.red)
    }
});