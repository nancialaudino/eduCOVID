const util = require('util');
const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'remotemysql.com',
    user: 'uQN7IdE9Zj',
    password: 'RlM979qgAW',
    database: 'uQN7IdE9Zj',
    port: 3306
});


// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
      }
      console.log(err);
    }
    
    if (connection) connection.release()

    return
})

pool.query = util.promisify(pool.query);  

module.exports = pool;