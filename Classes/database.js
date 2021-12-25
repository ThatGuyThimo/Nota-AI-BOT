const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ziverbot'
});

// Connect
/**
 * 
 * @param {string} from 
 * @returns {Array} array
 */
function select(from) { 
    db.connect(async function(err){
        if (err) throw err;
        if (typeof from !== 'undefined') {
            db.query(`SELECT * FROM ${from}`, async function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                console.log('ran');
                return result;
            });
        }
    });
};

module.exports = { select };