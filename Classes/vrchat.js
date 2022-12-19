const vrchat = require("vrchat");

const config = require("../Data/config.json");

let lastTime = new Date

const configuration = new vrchat.Configuration({
    username: config.email,
    password: config.password
});

let UsersApi = new vrchat.UsersApi(configuration);
let WorldApi = new vrchat.WorldsApi(configuration);



let AuthenticationApi = new vrchat.AuthenticationApi(configuration);


AuthenticationApi.getCurrentUser().then(resp => {
    console.log(`VRchat logged in as: ${resp.data.displayName}`);
})

var statestart =  'offline';

/**
 * 
 * @returns vrchat api data abou the user
 */
async function online() {
    let now = new Date
    if (now.getDay() != lastTime.getDay()) {
        console.log("Re initializing api.")
        await AuthenticationApi.logout()
        console.log(configuration)
        UsersApi = new vrchat.UsersApi(configuration);
        WorldApi = new vrchat.WorldsApi(configuration);
        AuthenticationApi = new vrchat.AuthenticationApi(configuration);
        await AuthenticationApi.getCurrentUser().then(resp => {
            console.log(`VRchat logged in as: ${resp.data.displayName}`);
        })
        console.log("Api re initialized.")
        lastTime = now
    }
    return new Promise((resolve, reject) => {
        UsersApi.getUser(config.user).then(resp => {
            if (resp.data.bio == "") {
                resp.data.bio = "none"
            }
            if (resp.data.statusDescription == "") {
                resp.data.statusDescription = "none"
            }
        resolve(resp.data)
     }).catch(error => {
        reject(error)
     })
    })
}

async function getWorld(worldId) {
    if(worldId == "private"){return {"name": "Private"}}
    if(worldId == "offline"){return {"name": "Offline"}}

    return new Promise((resolve, reject) => {
        WorldApi.getWorld(worldId).then(resp => {
            resolve(resp.data)
        }).catch(error => {
            reject(error)
        })
    })   
}
async function getInstance(worldId, instanceId) {
    if(worldId == "private"){return {"name": ""}}
    if(worldId == "offline"){return {"name": ""}}
    
    return new Promise((resolve, reject) => {
        WorldApi.getWorldInstance(worldId, instanceId).then(resp => {
            resolve(resp.data)
        }).catch(error => {
            reject(error)
        })
    })
}

/**
 * 
 * @param {Client} client 
 */
async function onlineping(client) {
    await online().then(statenow => {
        if (statestart != statenow.state) {
            statestart = statenow.state;
            if (statestart == "online") {
                client.channels.cache.get('927271117155074158').send(`<@&924403524027154513> nota is ${statestart}`);
                    client.channels.cache.get('923611865001631764').send(`<@&924403524027154513> nota is online`);
            } else if(statestart == "active") {
                client.channels.cache.get('927271117155074158').send(`nota is ${statestart}`);
                    client.channels.cache.get('923611865001631764').send(`nota is active`);
            } else {
                client.channels.cache.get('927271117155074158').send(`nota is ${statestart}`);
                    client.channels.cache.get('923611865001631764').send(`nota is offline`);
            }
    
        }
    }).catch(error => {
        console.warn(error)
    });
}

module.exports = { online, onlineping, getWorld, getInstance }