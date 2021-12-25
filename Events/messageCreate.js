const Event = require("../Structures/Event.js");

module.exports = new Event("messageCreate", (client, message) =>{
    if (message.author.bot) return;

    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.substring(client.prefix.length).split(/ +/);

    const command = client.commands.find(cmd => cmd.name == args[0]);

    if (!command) return message.reply(`Invalid command: ${args[0]}`);

    command.run(message, args, client);
});