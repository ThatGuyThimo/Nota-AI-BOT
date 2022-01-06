const vrchat = require("vrchat");

const config = require("../Data/config.json");


const configuration = new vrchat.Configuration({
    username: config.email,
    password: config.password
});

const UsersApi = new vrchat.UsersApi(configuration);

const AuthenticationApi = new vrchat.AuthenticationApi(configuration);

AuthenticationApi.getCurrentUser().then(resp => {
    console.log(`VRchat logged in as: ${resp.data.displayName}`);
})

var statestart =  'offline';

function online() {
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