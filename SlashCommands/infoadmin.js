const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

const { online } = require("../Classes/vrchat.js");

module.exports = new Command({
    name: "infoadmin",
    description: "gives you info about nota",

    async run(message, args, client) {
        data = await online()


        if(message.member.permissions.has("ADMINISTRATOR")) {

        const embed = new Discord.MessageEmbed();

        embed.setTitle(`About Nota AI,`)
            .setAuthor(
                message.user.username,
                message.user.avatarURL()
            )
            .setDescription(`Information about Nota AI`)
            .setColor(config.color)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setTimestamp(message.createdTimestamp)
            .addFields(
                {
                    name: "date joined",
                    value: `${data.date_joined}`,
                    inline: false
                },
                {
                    name: "status",
                    value: `${data.status}`,
                    inline: false
                },
                {
                    name: "location",
                    value: `[Click here](https://vrchat.com/home/launch?worldId=${data.worldId}&instanceId=${data.instanceId})`,
                    inline: false
                },
                {
                    name: "worldID",
                    value: `${data.worldId}`,
                    inline: false
                },
                {
                    name: "instanceID",
                    value: `${data.instanceId}`,
                    inline: false
                },
                {
                    name: "online status",
                    value: `${data.state}`,
                    inline: false
                },
            );
        try {
            message.reply({ embeds: [embed] });
        } catch {
            console.log('something went wrong')
        }
    } else {
        message.channel.send("You don't have permission to use that command!");
    }
}

});