const Event = require("../Structures/Event.js");

module.exports = new Event("ready", client => {
    console.log(`Logged in as ${client.user.tag}`);
});