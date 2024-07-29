import "dotenv/config"
import express from "express"

const PORT = process.env.PORT

//Importar conexão
import conn from "./config/conn.js"

const app = express()

app.get("/", (req, res)=>{
    res.send("Hello World!")
})

app.listen(PORT, ()=>{
    console.log("Servidor on PORT " + PORT)
})