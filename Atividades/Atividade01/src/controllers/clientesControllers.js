import {v4 as uuidv4} from "uuid"
import conn from "../config/dbconfig";

export const pegarClientes = (req,res) =>{
    const sql = `SELECT * FROM clientes`
    conn.query(sql, (err,data)=>{
        if(err){
            console.error(err)
            res.status(500).json({message: "Erro ao ler os dados"})
        }

        const clientes = data
        res.status(200).json({message: ""})
    })
}

export const criarCliente = (req,res)=>{
    const {nome,senha,imagem,email} = req.body
    if(!nome){
        return res.status(400).json({message: "O nome não pode ser vazio"})
    }
    if(!senha){
        return res.status(400).json({message: "A senha não pode ser vazia"})
    }
    if(!imagem){
        return res.status(400).json({message: "A Imagem não pode ser vazia"})
    }
    if(!email){
        return res.status(400).json({message: "O email não pode ser vazia"})
    }

    if(!email.includes("@")){
        response.status(422).json({message: "O e-mail deve conter @"})
        return
    }

    const checkSql = /*sql*/`
    SELECT * FROM clientes
    WHERE ?? = ?
    `

    checkData = ["email", email]
    conn.query(checkSql, checkData, (err,data)=>{
        if(err){
            res.status(500).json({message: "Erro ao cadastar o cliente."})
            return console.error(err)
        }

        if(data.length > 0 ){
            return res.status(404).json({message: "2 clientes não podem ter o mesmo email."})
        }

        const id = uuidv4()
        const addCliente = /*sql*/`
            INSERT INTO clientes(??,??,??,??,??)
            VALUES(?,?,?,?,?)
        `
        checkAdd = ["cliente_id", "nome", "senha", "imagem", "email", id,nome, senha, imagem, email]
        conn.query(addCliente, checkAdd,(err,data) => {
            if(err){
                res.status(500).json({message: "Erro ao cadastar o cliente"})
                return console.error(err)
            }
            res.status(201).json({message: `Cliente ${nome} foi cadastrado`})
        })
    })
}

export const editarCliente = (req,res) => {
    const {id} = req.params
    const {nome,senha,imagem,email} = req.body
    if(!nome){
        return res.status(400).json({message: "O nome não pode ser vazio"})
    }
    if(!senha){
        return res.status(400).json({message: "A senha não pode ser vazia"})
    }
    if(!imagem){
        return res.status(400).json({message: "A Imagem não pode ser vazia"})
    }
    if(!email){
        return res.status(400).json({message: "O email não pode ser vazia"})
    }

    if(!email.includes("@")){
        response.status(422).json({message: "O e-mail deve conter @"})
        return
    }

    const checkSql = /*sql*/`
        SELECT * FROM clientes
        where ?? = ?
    `
    checkData = ["email", email] 
    conn.query(checkSql, checkData, (err,data) =>{
        if(err){
            res.status(500).json({message: "Erro ao buscar os dados!"})
            return console.error(err)
        }

        if(data.length == 0){
            return res.status(404).json({message: "Não foi encontrado nenhum usuário."})
        }
    


const checkEmail = /*sql*/`
    SELECT * FROM clientes
`;

conn.query(checkEmail, (err,data) =>{
    if(err){
        res.status(500).json({message: "Erro ao buscar os dados!"})
        return console.error(err)
    }

    const index = data.findIndex(cliente => cliente.id == id)
    data.splice(index,1)

    if(data.filter(cliente => cliente.email == email).length > 0){
        return res.status(403).json({message: "Já existe um usuário com esse email."})
    }

    const updateSQL = /*sql*/`
    UPDATE clientes
    SET ?? = ?, ?? = ?, ?? = ?, ?? = ?
    WHERE ?? = ?
    `

    checkUpdateData = ["nome", "senha", "imagem", "email", "cliente_id", nome, senha, imagem, email, id]
    conn.query(updateSQL, (err)=>{
        if(err){
            res.status(500).json({message: "Erro ao atualizar o cliente"})
            return console.error(err)
        }
        res.status(200).json({message: `O cliente ${nome} foi atualizado.`})
        res.end()
            })
        })
    })
}