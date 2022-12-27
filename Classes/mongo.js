const config = require("../Data/config.json");

const { MongoClient } = require("mongodb");

const client = new MongoClient(config.mongo);

async function dbInsert(discordName, discordId, vrchatName, vrchatId) {
    return new Promise(async function (resolve, reject) {
        try {
            const database = client.db('notaai');
            const users = database.collection('users');

            const getDiscordId = users.find({discordId:`${discordId}`}) ;
            const getVrchatId = users.find({vrchatId:`${vrchatId}`});
        
            if ( getDiscordId.discordId == undefined && getVrchatId.vrchatId == undefined ) {
                const query = {discordName:`${discordName}`, discordId:`${discordId}`, vrchatName:`${vrchatName}`, vrchatId:`${vrchatId}`}

                result = await users.insertOne(query);

                resolve(result)
            } else {
                reject("User alreadyExists.")
            }
        } catch(error) {
            console.warn(error)
            reject("Something went wrong with the database.")
        }
    }) 
  }

async function dbFindAndDelete(discordId = "none", vrchatId = "none") {
    return new Promise(async function (resolve, reject) {
        try {
            const database = client.db('notaai');
            const users = database.collection('users');
            
            if (discordId != "none") {
                users.findOneAndDelete({discordId:`${discordId}`});
                resolve("Entry deleted")
            } else if( vrchatId != "none") {
                users.findOneAndDelete({vrchatId:`${vrchatId}`});
                resolve("Entry deleted")
            } else {
                resolve("Entry notfound")
            }

        } catch(error) {
            console.warn(error)
            reject("Something went wrong with the database delete function.")
        }
    }) 
  }

async function dbFindAndBan(discordId = "none", vrchatId = "none") {
    return new Promise(async function (resolve, reject) {
        try {
            const database = client.db('notaai');
            const users = database.collection('users');
            
            if (discordId != "none") {
                const deleteByDiscordId = users.findOneAndUpdate({discordId:`${discordId}`, banned: "yes"});
                console.log(deleteByDiscordId, "deleteByDiscordId")
                resolve("User banned")
            } else if( vrchatId != "none") {
                const DeleteByVrchatId = users.findOneAndUpdate({vrchatId:`${vrchatId}`, banned: "yes"});
                console.log(DeleteByVrchatId, "deleteByVrchatId")
                resolve("User banned")
            } else {
                resolve("User notfound")
            }

        } catch(error) {
            console.warn(error)
            reject("Something went wrong with the database.")
        }
    }) 
  }

module.exports = {dbInsert, dbFindAndDelete, dbFindAndBan}