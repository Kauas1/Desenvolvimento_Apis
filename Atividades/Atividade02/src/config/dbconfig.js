import mysql from 'mysql2'

const conn = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "Sen@iDev77!.",
    database: "BusTrack",
    port: 3306
})

try {
    console.log("Mysql conectado")
} catch (error) {
    console.error(error)
}

export default conn;