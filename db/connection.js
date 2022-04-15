const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kumcox-xItton-6dezwo',
    database: 'employee'
});


module.exports =db;