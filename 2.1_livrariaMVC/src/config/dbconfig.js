import mysql from 'mysql2';

const conn = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "Sen@iDev77!.", //Sen@iDev77!.
    database: "livrariaMVC",
    port: 3306
});

// conn.connect((err) => {
//     if(err){
//         return console.error(err.stack);
//     }
//     console.log("Mysql Conectado");
// });

export default conn;