import "dotenv/config"
import  express, { application }  from "express"
import mysql from "mysql2"
import {v4 as uuidv4} from "uuid"

const PORT = process.env.PORT
const app = express();

app.use(express.json());

// Criar conexão com o bando de dados MYSQL

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sen@iDev77!.",
    database: "livraria",
    port: 3306
});

// conectar ao banco de dados

conn.connect((err)=>{
    if(err){
    return console.error(err.stack)
    }
    console.log("Mysql Connection")
        app.listen(PORT, ()=>{
            console.log("Servidor on PORT "+ PORT)
    });
});

app.get("/", (request, response)=>{
    response.send("Olá, Mundo!")
});

//Rota 404

app.use((req,res)=>{
    res.status(404).json({message: "Rota não encontrada."})
})