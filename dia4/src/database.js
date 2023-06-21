//CONEXIÓN CON LA BASE DE DATOS ESCUELA
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'codenotch',
        database: 'reto1',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0
});

//exportar conexión con la BBDD
module.exports = { pool };