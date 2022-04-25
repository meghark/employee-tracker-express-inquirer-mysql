import mysql from 'mysql2';
import dotenv from 'dotenv'
dotenv.config();

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});


export {db};