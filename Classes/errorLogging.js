const config = require("../Data/config.json");

const fs = require('fs');
const path = require('path');
const { resolve } = require("path");

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
            fs.writeFile(`${config.loggingDir}errorLogs/${fileName}.txt`, `error :${value}`, function (error) {
                if (error) {
                    console.log(error)
                    reject(false)
                }
                fs.close()
                resolve(fileName)
            })
        }
    })
}
module.exports = {logError}