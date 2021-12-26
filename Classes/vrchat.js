const vrchat = require("vrchat");

const config = require("../Data/config.json");


const configuration = new vrchat.Configuration({
    username: "ThatGuyThimo",
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
            UsersApi.getUser("usr_9e88f97b-9264-47c9-ba9c-a1794513ae43").then(resp => {
            resolve(resp.data)
         })
        })
    } catch {
        console.log('something went wrong')
    }
}

function onlinestate() {
    try {
        return new Promise(resolve => {
            UsersApi.getUser("usr_9e88f97b-9264-47c9-ba9c-a1794513ae43").then(resp => {
            resolve(resp.data.state)
         })
        })
    } catch {
        console.log('something went wrong')
    }
}

async function onlineping(client) {
    try {
        statenow = await onlinestate();
        if (statestart != statenow) {
            console.log({statestart})
            console.log({statenow})
            statestart = statenow;
            if (statestart == "online") {
                client.channels.cache.get('923611865001631764').send(`<@&924403524027154513> nota is ${statestart}`);
            } else {
                client.channels.cache.get('923611865001631764').send(`nota is ${statestart}`);
            }
    
        }
    } catch {
        console.log('something went wrong')
    }
}

module.exports = { online, onlineping }