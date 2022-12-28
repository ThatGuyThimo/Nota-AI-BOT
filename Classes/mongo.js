const config = require("../Data/config.json");

const { MongoClient } = require("mongodb");

const client = new MongoClient(config.mongo);


/**
 * 
 * @param {String} discordName Users Discord name.
 * @param {String} discordId Users Discord id.
 * @param {String} vrchatName Users VRChat name.
 * @param {String} vrchatId Users VRChat id.
 * @returns 
 */
async function dbInsert(discordName, discordId, vrchatName, vrchatId) {
    return new Promise(async function (resolve, reject) {
        try {
            const database = client.db('notaai');
            const users = database.collection('users');

            let getUser = await users.findOne({"discordId": discordId});

            if (getUser == null) {
                getUser = await users.findOne({"vrchatId": vrchatId });
            }
        
            if ( getUser == null) {
                const query = {discordName:`${discordName}`, discordId: discordId , vrchatName:`${vrchatName}`, vrchatId: vrchatId }

                result = await users.insertOne(query);

                resolve(result)
            } else if(getUser.banned == null && getUser.discordId == discordId && getUser.vrchatId == vrchatId) {
                
                resolve("Not Banned.")
            } else if(getUser.banned == "yes") {
                
                resolve("User is banned.")
            } else {
                
                resolve("User already registered.")
            }
        } catch(error) {
            console.warn(logError(error), dbInsert)
            reject("Something went wrong with the database.")
        }
    }) 
  }

/**
 * 
 * @param {String} discordId Users Discord id (optional).
 * @param {String} vrchatId Users VRChat id (optional).
 * @returns String Completion status.
 */
async function dbFindAndDelete(discordId = "none", vrchatId = "none") {
    return new Promise(async function (resolve, reject) {
        try {
            const database = client.db('notaai');
            const users = database.collection('users');
            
            if (discordId != "none") {
                users.findOneAndDelete({"discordId": discordId});
                resolve("Entry deleted")
            } else if( vrchatId != "none") {
                users.findOneAndDelete({"vrchatId": vrchatId});
                resolve("Entry deleted")
            } else {
                resolve("Entry notfound")
            }

        } catch(error) {
            console.warn(logError(error), "dbFindAndDelete")
            reject("Something went wrong with the database delete function.")
        }
    }) 
  }

 /**
 * 
 * @param {String} discordId Users Discord id (optional).
 * @param {String} vrchatId Users VRChat id (optional).
 * @returns String Completion status.
 */
async function dbFindAndBan(discordId = "none", vrchatId = "none") {
    return new Promise(async function (resolve, reject) {
        try {
            const database = client.db('notaai');
            const users = database.collection('users');
            
            if (discordId != "none") {
                const banByDiscordId = users.findOneAndUpdate({"discordId": discordId}, { $set: {"banned": "yes"}});
                console.log(banByDiscordId, "banByDiscordId")
                resolve("User banned.")
            } else if( vrchatId != "none") {
                const banByVrchatId = users.findOneAndUpdate({"vrchatId": vrchatId}, { $set: {"banned": "yes"}});
                console.log(banByVrchatId, "banByVrchatId")
                resolve("User banned.")
            } else {
                resolve("User notfound.")
            }

        } catch(error) {
            console.warn(logError(error), "dbFindAndBan")
            reject("Something went wrong with the database.")
        }
    }) 
  }
 /**
 * 
 * @param {String} discordId Users Discord id (optional).
 * @param {String} vrchatId Users VRChat id (optional).
 * @returns String Completion status.
 */
async function dbFind(discordId = "none", vrchatId = "none") {
    return new Promise(async function (resolve, reject) {
        try {
            const database = client.db('notaai');
            const users = database.collection('users');
            
            if (discordId != "none") {
                const searchByDiscordId = users.findOne({"discordId": discordId});
                console.log(searchByDiscordId, "banByDiscordId")
                resolve(searchByDiscordId)
            } else if( vrchatId != "none") {
                const searchByVrchatId = users.findOne({"vrchatId": vrchatId});
                console.log(searchByVrchatId, "banByVrchatId")
                resolve(searchByVrchatId)
            } else {
                resolve("User notfound.")
            }

        } catch(error) {
            console.warn(logError(error), "dbFind")
            reject("Something went wrong with the database.")
        }
    }) 
  }

module.exports = {dbInsert, dbFindAndDelete, dbFindAndBan, dbFind}