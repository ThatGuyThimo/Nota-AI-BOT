const vrchat = require("vrchat");

const config = require("../Data/config.json");

const { dbInsert, dbFindAndDelete } = require("./mongo.js");

let lastTime = new Date
let lastPing = new Date
lastPing = lastPing.getTime()

const configuration = new vrchat.Configuration({
    username: config.email,
    password: config.password
});

let UsersApi = new vrchat.UsersApi(configuration);
let WorldApi = new vrchat.WorldsApi(configuration);
let GroupApi = new vrchat.GroupsApi(configuration);



let AuthenticationApi = new vrchat.AuthenticationApi(configuration);


AuthenticationApi.getCurrentUser().then(resp => {
    console.log(`VRchat logged in as: ${resp.data.displayName}`);
})

let state =  'offline';

function testJoinGroup() {

    GroupApi.respondGroupJoinRequest("grp_6381f151-7124-4031-8b67-045da5a2dfc5", "usr_e3961c1a-5107-4494-8133-afe65712f4a8", '{"action" : "accept"}').then(result =>{
        console.log(result, "result")

    }).catch(error => {
        console.log(error, "err")
    })

}


async function joinGroup(username, message) {
return new Promise((resolve, reject) => {
    GroupApi.getGroupRequests(config.groupId).then(result => {
        
        let index = 0

        result.data.forEach(async function (request) {
            index++
            if (request.user.displayName == username) {
                dbInsert(message.user.username, message.user.id, request.user.displayName, request.userId).then(async function(result) {              
                    await GroupApi.respondGroupJoinRequest(config.groupId, request.userId, '{"action" : "accept"}').then(result =>{
                        resolve(`${username} accpeted.`)

                    }).catch(error => {
                        dbFindAndDelete(message.user.id, request.userId).then(result => {
                            if (result == "Entry notfound") {
                                console.warn(`${result} discordId:${message.user.id} vrchatId:${request.userId}`)
                            }
                            reject(error)
                        }).catch(error =>{
                            console.warn(error)
                            reject(error)
                        })
                    })
                }).catch(error => {
                    resolve(error)
                })
            } else if(index == result.data.length) {
                resolve("User not found.")
            }
        }) 
    }).catch(error => {
        console.log(error.data, "mango")
        reject(error)
    })
    
})
}


async function connect(now) {
    try {
        console.log("Re initializing api.")
        await AuthenticationApi.logout()

        UsersApi = new vrchat.UsersApi(configuration);
        WorldApi = new vrchat.WorldsApi(configuration);
        GroupApi = new vrchat.GroupsApi(configuration);
        AuthenticationApi = new vrchat.AuthenticationApi(configuration);
        
        await AuthenticationApi.getCurrentUser().then(resp => {
            console.log(`VRchat logged in as: ${resp.data.displayName}`);
        })
        lastTime = now

    } catch(error) {
        console.warn(error)
    }
}

/**
 * 
 * @returns vrchat api data abou the user
 */
async function online() {
    let now = new Date
    if (now.getDay() != lastTime.getDay()) {
        await connect(now)
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
     }).catch(async function(error) {
         await connect(now)
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
    if(worldId == "private" || worldId == "offline"){return {"name": ""}}
    
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
        if (state != statenow.state) {
            state = statenow.state;
            sendPing(state, client)
        }
    }).catch(error => {
        console.warn(error)
    });
}

function sendPing(state, client) {
    now = new Date
    switch(state){
        case "online":
            if (lastPing < now.getTime()) {
                console.log()
                client.channels.cache.get('927271117155074158').send(`<@&924403524027154513> nota is online`);
                client.channels.cache.get('923611865001631764').send(`<@&924403524027154513> nota is online`);

                lastPing = now.getTime() + config.pingTimout
            } else {
                client.channels.cache.get('927271117155074158').send(`nota is online`);
                client.channels.cache.get('923611865001631764').send(`nota is online`);
            }
            break
        case "active":
            client.channels.cache.get('927271117155074158').send(`nota is active`);
            client.channels.cache.get('923611865001631764').send(`nota is active`);
            break
        default:
            client.channels.cache.get('927271117155074158').send(`nota is offline`);
            client.channels.cache.get('923611865001631764').send(`nota is offline`);
            break
    }
}

module.exports = { online, onlineping, getWorld, getInstance, joinGroup, testJoinGroup }