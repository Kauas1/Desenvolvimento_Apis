import mysql from 'mysql2'

const conn = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "Sen@iDev77!.",
    database: "livraria_atividade",
    port: 3306
})

export default conn;