// Create a 'connection pool' using the provided credentials
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_crawzach',
  password        : '3652',
  database        : 'cs340_crawzach'
  // DEBUG: true
});

module.exports.pool = pool;
