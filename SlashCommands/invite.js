const SlashCommand = require("../Structures/SlashCommand.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

const { online, getWorld, getInstance } = require("../Classes/vrchat.js");

module.exports = new SlashCommand({
    name: "invite",
    description: "creates an invite to notas world",

    async run(message, args, client) {
        try {
            let data = await online()
            let hasRole = false
            let index = 0
        
            if (data.state == "offline") {
                const { roles } = message.member;
                // const role = await message.guild.roles
                // .fetch("930647071260823584")
                // .catch(console.error)
                console.log(roles, "kaas")
                // console.log(Discord.RoleManager, "banaan")
                // roles.cache._roles.forEach(async function (role) {    
                //     index++
                //     if(role == '930647071260823584') {
                //         hasRole = true
                //         const embed = new Discord.MessageEmbed();
                //         const world = await getWorld(data.worldId);
                //         const instance = await getInstance(data.worldId, data.instanceId);
            
                //         embed.setTitle(`Invite link`)
                //             .setAuthor(
                //                 message.user.username,
                //                 message.user.avatarURL()
                //             )
                //             .setDescription(`generated invite link to nota`)
                //             .setColor(config.color)
                //             .setThumbnail(client.user.avatarURL({ dynamic: true }))
                //             .setTimestamp(message.createdTimestamp)
                //             .addFields([
                //                 {
                //                     name: "location",
                //                     value: `[${world.name}#${instance.name}](https://vrchat.com/home/launch?worldId=${data.worldId}&instanceId=${data.instanceId})`,
                //                     inline: false
                //                 }
                //             ]);
                //         try {
                //             message.reply({ embeds: [embed] });
            
                //     } catch(error) {
                //         console.warn(error)
                //         message.reply("Something went wrong")
                //     }
                // } else if (index == roles.cache._roles.length && hasRole == false) {
                //     const embed = new Discord.EmbedBuilder()
                //     .setTitle(`❗No permission❗`)
                //     .setDescription(`Ask users with the <@&930647071260823584> role to use this SlashCommand.`)
                //     .setColor(config.color)
            
                //     try {
                //         message.reply({ embeds: [embed] });
                //     } catch(error) {
                //         console.warn(error)
                //         message.reply("Something went wrong")
                //     }
                // }
                // });
        } else {
            message.reply("invite not created Nota is offline");
        }
    } catch(error) {
    console.warn(error)
    message.reply("Something went wrong")
    }
}

});