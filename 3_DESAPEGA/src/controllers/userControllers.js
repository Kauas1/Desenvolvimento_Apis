import conn from "../config/conn.js";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt  from "jsonwebtoken";
//helpers
import createUserToken from "../helpers/create-user-token.js"; 
import getToken from "../helpers/get-token.js";
import { json } from "express";


//Criar usuário.
export const registerUser =  (req, res) => {
    const {nome, email, telefone, senha} = req.body;
    let {imagem} = req.body;
    if(!imagem){
        imagem = './images/default.png'
    }
    const validateSql = /*sql*/ `
        SELECT * FROM users
        WHERE ?? = ?
    `
    
    const checkVal = ["email", email];

    conn.query(validateSql, checkVal, async (err, data) => {
        if(err){
            res.status(500).json("Ocorreu um erro na criação!")
            return console.error(err);
        }

        if(data.length > 0){
            return res.status(400).json('Já existe um usuario com este email!');
        }
        
        //criarSenha

        const salt = await bcrypt.genSalt(12)
        console.log(salt)

        const senhaHash = await bcrypt.hash(senha, salt)
        console.log(`${senha} - ${senhaHash}`)
        const id = uuidv4();
        const createUser = /*sql*/ `
            INSERT INTO users(??, ??, ??, ??, ??, ??)
            VALUES(?, ?, ?, ?, ?, ?)
        `
        const dataValues = ["id", "nome", "email", "telefone", "senha", "imagem", id, nome, email, telefone, senhaHash, imagem];
        conn.query (createUser, dataValues, (err) => {
            if(err){
                res.status(500).json("Ocorreu um erro na busca!")
                return console.error(err);
            }
            usuariosql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`
            usuarioData = ["usuario_id", id]
            conn.query(usuariosql, usuarioData, async (err,data) =>{
                if(err){
                    console.error(err)
                    res.status(500).json({err: "Erro ao selecionar usuário"})
                    return
                }
                const usuario = data[0]

                try {
                  await createUserToken(usuario, req, res)
                } catch (error) {
                    console.error(error)
                }
            });
            //Usuário esteja logado na aplicação
          
        })
    })
}
//Login
export const login = (req,res) =>{
    const {email, senha} = req.body

    //validações
    if(!email){
        res.status(400).json({err: "O email é obrigatório"})
    }
    if(!senha){
        res.status(400).json({err: "A senha é obrigatória."})
    }

    const checkSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`
    const checkData = ['email', email]
    
    conn.query(checkSql, checkData, async (err, data)=>{
        if(err){
            console.error(err)
            res.status(500).json({err: "Erro ao buscar usuário."})
            return
        }
        if(data.length === 0 ){
            res.status(404).json({err: "Usuário não encontrado"})
            return
        }

        const usuario = data[0]

        //Verificar se a senha existe/comparar senha

        const compararSenha = await bcrypt.compare(senha, usuario.senha)
        // console.log("senha do usuário: ", senha)
        // console.log("senha do Objeto: ", usuario.senha)
        // console.log("comparar senha: ", compararSenha)
        if(!compararSenha){
            return res.status(401).json({message: "Senha Inválida."})
        }

        try {
            await createUserToken(usuario, req, res)
        } catch (error) {
            console.error(error)
            res.status(500).json({err: "Erro ao processar as informações."})
            
        }
    })
}


//Verificar usuário
export const checkUser = (req,res) =>{
    let usuarioAtual
    //criar um helper para fazer a verificação
    if(req.headers.authorization){
       const token =  getToken(req)

       const decoded = jwt.decode(token, "SENHASUPERSEGURAEDIFICIL")
       
       const usuarioId = decoded.id

       const checkSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`
       const checkData = ["usuario_id", usuarioId]
       conn.query(checkSql, checkData, (err, data) =>{
        if(err){
            console.error(err)
            res.status(500).json({err: "Erro ao verificar usuário."})
            return
        }
        usuarioAtual = data[0]
        res.status(200).json(usuarioAtual)
       })
    }else{
        usuario = null
        res.status(200).json(usuarioAtual)
    }

}

export const listUser = (req, res) => {
    const select = /*sql*/ `
        SELECT * FROM users;
    `

    conn.query(select, (err, data) => {
        if(err){
            res.status(500).json("Ocorreu um erro na busca!")
            return console.error(err);
        }

        res.status(200).json(data);
    })
}
