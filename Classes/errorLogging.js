const config = require("../Data/config.json");

const fs = require('fs');
const path = require('path');
const Discord = require("discord.js");

/**
 * Creates error loging dir.
 */
async function _createloggingFolder() {
    return new Promise((resolve, reject) =>{
        fs.mkdirSync(path.join(config.loggingDir, "errorLogs"), { recursive: true }, function (error) {
            if (error) {
                console.log(error)
                reject(error)
            }
        })
        resolve(true)
    })
}

/**
 * 
 * @param {error} value 
 * @returns string (file name)
 */
async function logError(value) {
    return new Promise(async function (resolve, reject) {        
        let date = new Date
        let fileName = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}-h${date.getHours()}-m${date.getMinutes()}-s${date.getSeconds()}`
        if (await _createloggingFolder()) {
            fs.open(`${config.loggingDir}errorLogs/${fileName}.txt`, 'w', function (error) {
                if (error) {
                    console.log(error)
                    reject(false)
                }
            })
            fs.writeFile(`${config.loggingDir}errorLogs/${fileName}.txt`, `${value}`, function (error) {
                if (error) {
                    console.log(error)
                    reject(false)
                }
                resolve(fileName)
            })
        }
    })
}

/**
 * 
 * @param {Discord client} client 
 * @param {String} error 
 */
async function sendErrorDC(client, message, command, error) {
    try {
        await client.channels.fetch('1094725966883983441')
        botErrors = await client.channels.cache.get('1094725966883983441')

        const embed = new Discord.EmbedBuilder()

        .setTitle(`ERROR LOG`)
        .setAuthor({
            name : message.user.tag,
            iconURL : message.user.avatarURL()
        })
        .setColor("FF0000")
        .setTimestamp()
        .addFields([
            {
                name: "Bot Version",
                value: "0.1.3",
                inline: false
            },
            {
                name: "Command",
                value: `${command}`,
                inline: false
            },
            {
                name: "Send by",
                value: `${message.user.tag}`,
                inline: false
            },
            {
                name: "Error",
                value: "```js\n" + error + "```",
                inline: false
            },
        ]);
        botErrors.send({ embeds: [embed] });
} catch {
    console.log('something went wrong with sendErrorDC')
}
}
module.exports = {logError, sendErrorDC}