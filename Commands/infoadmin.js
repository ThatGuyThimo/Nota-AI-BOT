const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

const { online, getWorld, getInstance } = require("../Classes/vrchat.js");

module.exports = new Command({
    name: "infoadmin",
    description: "gives you info about nota",

    async run(message, args, client) {
        data = await online()


        if(message.member.permissions.has("ADMINISTRATOR")) {

        const embed = new Discord.MessageEmbed();
        const world = await getWorld(data.worldId);
        const instance = await getInstance(data.worldId, data.instanceId);


        embed.setTitle(`About Nota AI,`)
            .setAuthor(
                message.author.username,
                message.author.avatarURL({ dynamic: true })
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
                    value: `[${world.name}#${instance.name}](https://vrchat.com/home/launch?worldId=${data.worldId}&instanceId=${data.instanceId})`,
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
                {
                    name: "Last_Login",
                    value: `${data.last_login}`,
                    inline: false
                },
                {
                    name: "StatusDescription",
                    value: `${data.statusDescription}`,
                    inline: false
                },
                {
                    name: "Bio",
                    value: `${data.bio}`,
                    inline: false
                }
            );
        try {
            message.channel.send({ embeds: [embed] });
        } catch {
            console.log('something went wrong')
        }
    } else {
        message.channel.send("You don't have permission to use that command!");
    }
}

});