const fs = require('fs');

const voiceDiscord = require('@discordjs/voice');

let time = new Date().getHours();

/**
 * 
 * @param {String} json 
 * @param {String} key 
 * @returns {String}
 */
function randomArray(json, key) {

    let array = fs.readFileSync(`./Data/${json}`);
    let data = JSON.parse(array);

    var keylist = Object.keys(data[key]);
    var ran_key = keylist[Math.floor(Math.random() * keylist.length)];

    return (data[key][keylist[ran_key]]);
}
/**
 * 
 * @param {array} array 
 * @returns {String}
 */
function parsejson(array) {

    let data = JSON.parse(array);
    console.log(data);
}

/**
 * 
 * @param {Discord.Client} client  
 */
function intervalPing(client) {

    let nowtime = new Date().getHours();

    if (nowtime != time) {
        client.channels.cache.get('897144218571653150').send(randomArray("pings.json", "pings"));
        time = nowtime;
    }
}

/**
 * 
 * @param {string} source 
 * @param {Discord.Client.message} message 
 */
function playAudio(source, message) {
    const channel = message.member.voice.channel;
    if (!channel) {
        message.reply('Join a voice channel to use this command');
    } else {

        const player = voiceDiscord.createAudioPlayer();
        const resource = voiceDiscord.createAudioResource(`./audio/${source}`);

        const connection = voiceDiscord.joinVoiceChannel({
            channelId: channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });
        player.play(resource);
        connection.subscribe(player);

        player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
            connection.destroy();
        })
    }
}

module.exports = { randomArray, intervalPing, playAudio, parsejson };