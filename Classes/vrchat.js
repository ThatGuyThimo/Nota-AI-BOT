const vrchat = require("vrchat");

const config = require("../Data/config.json");

const { dbInsert, dbFindAndDelete, dbFindAndBan, dbFindAndUnban, dbFind } = require("./mongo.js");
const { logError } = require("./errorLogging.js");


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

/**
 * 
 * @param {String} username VRChat username to be accepted in to the VRChat group. 
 * @param {Object} client Discord client object.
 * @returns String Completion status.
 */
async function joinGroup(username, client) {
return new Promise((resolve, reject) => {
    GroupApi.getGroupRequests(config.groupId).then(result => {
        
        let index = 0
        let requestExists = false

        result.data.forEach(async function (request) {
            index++
            if (request.user.displayName == username) {
                requestExists = true
                dbInsert(client.user.username, client.user.id, request.user.displayName, request.userId).then(async function(result) { 
                    if (result == "User already registered.") {
                        resolve(result)
                    } else if (result == "User is banned.") {
                        resolve(result)
                    } else {
                        await GroupApi.respondGroupJoinRequest(config.groupId, request.userId, '{"action" : "accept"}').then(result =>{
                            resolve(`${username} accpeted.`)
    
                        }).catch(error => {
                            dbFindAndDelete(client.user.id, request.userId).then(result => {
                                if (result == "Entry notfound") {
                                    console.warn(`${result} discordId:${client.user.id} vrchatId:${request.userId}`)
                                }
                                reject(error)
                            }).catch(error =>{
                                reject(error)
                            })
                        })
                    }
                }).catch(error => {
                    resolve(error)
                })
            } else if(index == result.data.length && requestExists == false) {
                resolve("User not found. Did you request to join the VRChat group?")
            }
        }) 
    }).catch(error => {
        reject(error)
    })
    
})
}


/**
 * 
 * @param {String} userId vrchatId or discorId .
 * @returns 
 */
async function banUser(userId) {
    let reg = new RegExp('^usr_')
    return new Promise((resolve, reject) => {
        if(reg.test(userId)) {
            dbFind("none", userId).then(user => {  
                if (user == "User notfound.") {
                    resolve(user)
                } else {
                    if (user.banned == null) {
                        dbFindAndBan(user.discordId, user.vrchatId).then(result => {
                            if (result == "User banned.") {
                                GroupApi.banGroupMember(config.groupId, `{"userId" : "${user.vrchatId}"}`).then(function() {
                                    resolve(`Banned user vrcID: ${user.vrchatId} dcId: ${user.discordId} dcN: ${user.discordName} .`)
                                }).catch(async function (error) {
                                    console.warn(await logError(error), "banUser")
                                    reject(error)
                                })
                            } else {
                                resolve(result)
                            }
                        }).catch(error => {
                            resolve(error)
                        })
                    } else {
                        resolve("User already banned.")
                    }      
                }    
            }).catch(error => {
                reject(error)
            })
        } else {
            dbFind(userId).then(user => {  
                if (user == "User notfound.") {
                    resolve(user)
                } else {
                    if (user.banned == null) {
                        dbFindAndBan(user.discordId, user.vrchatId).then(result => {
                            if (result == "User banned.") {
                                GroupApi.banGroupMember(config.groupId, `{"userId" : "${user.vrchatId}"}`).then(function() {
                                    resolve(`Banned user vrcID: ${user.vrchatId} dcID: ${user.discordId} dcN: ${user.discordName} .`)
                                }).catch(async function (error) {
                                    console.warn(await logError(error), "banUser")
                                    reject(error)
                                })
                            } else {
                                resolve(result)
                            }
                        }).catch(error => {
                            resolve(error)
                        })
                    } else {
                        resolve("User already banned.")
                    }
                }
            }).catch(error => {
                reject(error)
            })
        }
    })
}
/**
 * 
 * @param {String} userId vrchatId or discorId .
 * @returns 
 */
async function unbanUser(userId) {
    let reg = new RegExp('^usr_')
    return new Promise((resolve, reject) => {
        if(reg.test(userId)) {
            dbFind("none", userId).then(user => {  
                if (user == "User notfound.") {
                    resolve(user)
                } else {
                    if (user.banned == "yes") {
                        dbFindAndUnban(user.discordId, user.vrchatId).then(result => {
                            if (result == "User unbanned.") {
                                GroupApi.unbanGroupMember(config.groupId, user.vrchatId).then(function() {
                                    resolve(`Unbanned user vrcID: ${user.vrchatId} dcId: ${user.discordId} dcN: ${user.discordName} .`)
                                }).catch(async function (error) {
                                    console.warn(await logError(error), "unbanUser")
                                    reject(error)
                                })
                            } else {
                                resolve(result)
                            }
                        }).catch(error => {
                            resolve(error)
                        })
                    } else {
                        resolve("User not banned.")
                    }      
                }    
            }).catch(error => {
                reject(error)
            })
        } else {
            dbFind(userId).then(user => {  
                if (user == "User notfound.") {
                    resolve(user)
                } else {
                    if (user.banned == "yes") {
                        dbFindAndUnban(user.discordId, user.vrchatId).then(result => {
                            if (result == "User unbanned.") {
                                GroupApi.unbanGroupMember(config.groupId, user.vrchatId).then(function() {
                                    resolve(`Unbanned user vrcID: ${user.vrchatId} dcID: ${user.discordId} dcN: ${user.discordName} .`)
                                }).catch(async function (error) {
                                    console.warn(await logError(error), "unbanUser")
                                    reject(error)
                                })
                            } else {
                                resolve(result)
                            }
                        }).catch(error => {
                            resolve(error)
                        })
                    } else {
                        resolve("User not banned.")
                    }
                }
            }).catch(error => {
                reject(error)
            })
        }
    })
}

/**
 * 
 * @param {Date} now Date in .getTime() format.
 */
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
        console.warn(await logError(error))
    }
}

/**
 * 
 * @returns VRChat api data abou the user.
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
         console.warn(await logError(error), "online")
        reject(error)
     })
    })
}

/**
 * 
 * @param {String} worldId VRChat api world id.
 * @returns VRChat api world information.
 */
async function getWorld(worldId) {
    if(worldId == "private"){return {"name": "Private"}}
    if(worldId == "offline"){return {"name": "Offline"}}

    return new Promise((resolve, reject) => {
        WorldApi.getWorld(worldId).then(resp => {
            resolve(resp.data)
        }).catch(async function (error) {
            console.warn(await logError(error), "getWorldId")
            reject(error)
        })
    })   
}

/**
 * 
 * @param {String} worldId VRChat api world id.
 * @param {String} instanceId VRChat api instanse id.
 * @returns 
 */
async function getInstance(worldId, instanceId) {
    if(worldId == "private" || worldId == "offline"){return {"name": ""}}
    
    return new Promise((resolve, reject) => {
        WorldApi.getWorldInstance(worldId, instanceId).then(resp => {
            resolve(resp.data)
        }).catch(async function (error) {
            console.warn(await logError(error), "getInstance")
            reject(error)
        })
    })
}

/**
 * 
 * @param {Client} client Discord client.
 */
async function onlineping(client) {
    await online().then(statenow => {
        if (state != statenow.state) {
            state = statenow.state;
            sendPing(state, client)
        }
    }).catch(async function (error) {
        console.warn(await logError(error), "onlineping")
    });
}

/**
 * 
 * @param {String} state Online state of the My lIttle Nota account.
 * @param {Object} client Discord client.
 */
async function sendPing(state, client) {
    try {

        await client.channels.fetch('927271117155074158')
        await client.channels.fetch('923611865001631764')
        adminChannel = await client.channels.cache.get('927271117155074158')
        userChannel = await client.channels.cache.get('923611865001631764')

        now = new Date
        switch(state){
            case "online":
                if (lastPing < now.getTime()) {
                    console.log()
                    adminChannel.send(`<@&924403524027154513> nota is online`);
                    userChannel.send(`<@&924403524027154513> nota is online`);
    
                    lastPing = now.getTime() + config.pingTimout
                } else {
                    adminChannel.send(`nota is online`);
                    userChannel.send(`nota is online`);
                }
                break
            case "active":
                adminChannel.send(`nota is active`);
                userChannel.send(`nota is active`);
                break
            default:
                adminChannel.send(`nota is offline`);
                userChannel.send(`nota is offline`);
                break
        }
    } catch (error) {
        console.warn(await logError(error), "SendPing")
    }
}

module.exports = { online, onlineping, getWorld, getInstance, joinGroup, banUser, unbanUser }