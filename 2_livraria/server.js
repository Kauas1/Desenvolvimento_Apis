


/////////////////////

import "dotenv/config" ;
import express,{application, response} from "express";
import mysql from "mysql2";
import { v4 as uuidv4 } from "uuid";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'Sen@iDev77!.',
    database:'livraria', 
    port: 3306
})

conn.connect((err)=>{
    if(err){
        return console.error(err.stack);
    };
    
    console.log("MySql Conectado");

    app.listen(PORT, ()=>{
        console.log('servidor na port', PORT);
    });
});


app.get("/livros", (req, res)=>{
    //query para banco de dados(consulta)
    const sql = /*sql*/`SELECT * FROM livros`;

    conn.query(sql, (err, data)=>{
        if(err){
            res.status(500).json({message:'Erro ao buscar livros'});
            return console.log(err);
        };

        const livros = data;
        res.status(200).json(livros);
    });
});

app.post('/livros', (req, res)=>{
    const {titulo, autor, ano_publicacao, genero, preco} = req.body;

    //validacoes
    if(!titulo){
        res.status(400).json({message: 'Campo obrigatório'});
        return 
    } else if(!autor){
        res.status(400).json({message: 'Campo obrigatório'});
        return 
    } else if(!ano_publicacao){
        res.status(400).json({message: 'Campo obrigatório'});
        return 
    } else if(!genero){
        res.status(400).json({message: 'Campo obrigatório'});
        return 
    } else if(!preco){
        res.status(400).json({message: 'Campo obrigatório'});
        return 
    };

//Cadastrar um livro -> antes preciso saber se este livro existe
    const checksql = /*sql*/ `
    SELECT * FROM livros 
    WHERE titulo = "${titulo}" AND 
    autor = "${autor}" AND 
    ano_publicacao = "${ano_publicacao}"`;

    conn.query(checksql, (err, data)=>{
        if(err){
            res.status(500).json({message:'Erro ao buscar livros'});
            return console.log(err);
        };

        if(data.length > 0){
            res.status(409).json({message:"Esse livro já existe na livraria"});
            return console.log(err);
        }

        const id = uuidv4()
        const disponibilidade = 1

        const insertSql = /*sql*/`INSERT INTO livros(id, titulo, autor, ano_publicacao, genero, preco, disponibilidade)
        VALUES("${id}", "${titulo}", "${autor}", "${ano_publicacao}", "${genero}","${preco}","${disponibilidade}")`

        conn.query(insertSql, (err) =>{
            if(err){
                res.status(500).json({message:'Erro ao cadastar livro'});
                return console.log(err);
            };

            res.status(201).json({message:'Livro cadastrado'})
        })

    });
});

app.get('/livros/:id', (req, res)=>{
    const {id} = request.params
})
app.put('/livros/:id', (req, res)=>{
    const {id} = request.params
})
app.delete('/livros/:id', (req, res)=>{
    const {id} = request.params
})
app.use((req, res)=>{
    res.status(404).json({message:"Não encontrado"});
});