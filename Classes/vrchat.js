const vrchat = require("vrchat");

const config = require("../Data/config.json");

let lastTime = new Date

const configuration = new vrchat.Configuration({
    username: config.email,
    password: config.password
});

let UsersApi = new vrchat.UsersApi(configuration);

let AuthenticationApi = new vrchat.AuthenticationApi(configuration);

AuthenticationApi.getCurrentUser().then(resp => {
    console.log(`VRchat logged in as: ${resp.data.displayName}`);
})

var statestart =  'offline';

/**
 * 
 * @returns vrchat api data abou the user
 */
function online() {
    let now = new Date
    if (now.getDay() != lastTime.getDay()) {
        console.log("Re initializing api.")
        UsersApi = new vrchat.UsersApi(configuration)
        AuthenticationApi = new vrchat.AuthenticationApi(configuration);
        console.log("Api re initialized.")
        lastTime = now
    }
    try {
        return new Promise(resolve => {
            UsersApi.getUser(config.user).then(resp => {
            resolve(resp.data)
         })
        })
    } catch {
        console.log('could not fetch user')
    }
}

/**
 * 
 * @param {Client} client 
 */
async function onlineping(client) {
    try {
        statenow = await online();
        if (statestart != statenow.state) {
            statestart = statenow.state;
            if (statestart == "online") {
                client.channels.cache.get('927271117155074158').send(`<@&924403524027154513> nota is ${statestart}`);
                setTimeout(function () {
                    client.channels.cache.get('923611865001631764').send(`<@&924403524027154513> nota is online`);
                }, config.timeout);
            } else if(statestart == "active") {
                client.channels.cache.get('927271117155074158').send(`nota is ${statestart}`);
                setTimeout(function () {
                    client.channels.cache.get('923611865001631764').send(`nota is active`);
                }, config.timeout);
            } else {
                client.channels.cache.get('927271117155074158').send(`nota is ${statestart}`);
                setTimeout(function () {
                    client.channels.cache.get('923611865001631764').send(`nota is offline`);
                }, config.timeout);
            }
    
        }
    } catch {
        console.log('something went wrong with the status check')
    }
}

module.exports = { online, onlineping }