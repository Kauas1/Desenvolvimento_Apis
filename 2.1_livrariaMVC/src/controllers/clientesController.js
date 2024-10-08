import conn from "../config/dbconfig.js";
import { v4 as uuidv4 } from "uuid";


export const pegarClientes = (req, res) => {
    const sql = `SELECT * FROM clientes`
    conn.query(sql, (err,data)=>{
        if(err){
            console.error(err)
            res.status(500).json({message: "Erro ao buscar livros"})
            return
        }
        const clientes = data
        res.status(200).json(clientes)
    })
}
export const criarCliente = (req, res) => {
    const {nome, senha, imagem, email} = req.body;
    if(!nome){
        return res.status(400).json({message: "O nome não pode ser vazio"});
    }
    if(!senha){
        return res.status(400).json({message: "O senha não pode ser vazio"});
    }
    if(!imagem){
        return res.status(400).json({message: "A imagem não pode ser vazio"});
    }
    if(!email){
        return res.status(400).json({message: "O email não pode ser vazio"});
    }
    
    if(!email.includes("@")){
        response.status(422).json({message:"O e-mail deve conter @"})
        return
    }

    const checkSql = /*sql*/ `
    SELECT * FROM clientes
    WHERE ?? = ?
    `;

    const checkData = ["email", email]
    conn.query(checkSql, checkData, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao cadastrar o funcionario!"});
            return console.error(err);
        }

        if(data.length > 0){
            return res.status(404).json({message: "2 clientes não podem ter o mesmo email!"});
        }
        const id = uuidv4();
        const addCliente = /*sql*/ `
        INSERT INTO clientes(??, ??, ??, ??, ??)
        VALUES(?, ?, ?, ?, ?)
        `;

      const  checkAdd = ["id", "nome", "senha", "imagem", "email", id, nome, senha, imagem, email]
        conn.query(addCliente, checkAdd,(err) => {
            if(err){
                res.status(500).json({message: "Erro ao cadastrar o cliente!"});
                return console.error(err);
            }
            res.status(201).json({message:`Cliente ${nome} foi cadastrado com sucesso!`});
        })
    });
}

export const editarCliente = (req, res) => {
    const {id} = req.params;
    const {nome, senha, imagem, email} = req.body;
    if(!nome){
        return res.status(400).json({message: "O nome não pode ser vazio"});
    }
    if(!senha){
        return res.status(400).json({message: "O senha não pode ser vazio"});
    }
    if(!imagem){
        return res.status(400).json({message: "A imagem não pode ser vazio"});
    }
    if(!email){
        return res.status(400).json({message: "O email não pode ser vazio"});
    }
    
    const checkSql = /*sql*/ `
    SELECT * FROM clientes
    WHERE ?? = ?
    `;

    checkData = ["email", email]
    conn.query(checkSql, checkData, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao buscar os dados!"});
            return console.error(err);
        }

        if(data.length == 0){
            return res.status(404).json({message: "Não foi encontrado nenhum cliente com este ID!"});
        }

        const checkEmail = /*sql*/ `
        SELECT * FROM clientes
        `;

        conn.query(checkEmail, (err, data) => {
            if(err){
                res.status(500).json({message: "Erro ao buscar os dados!"});
                return console.error(err);
            }

            const index = data.findIndex(cliente => cliente.id == id)
            data.splice(index, 1)

            if(data.filter(cliente => cliente.email == email).length > 0){
                return res.status(403).json({message: "Já existe um usuario com este email!"})
            }

            const updateSQL = /*sql*/ `
            UPDATE clientes
            SET ?? = ?, ?? = ?, ?? = ?, ?? = ?
            WHERE ?? = ?
            `;

            checkUpdateData = ["nome", "senha", "imagem","email", "cliente_id", nome, senha, imagem, email, id]
            conn.query(updateSQL, (err) => {
                if(err){
                    res.status(500).json({message: "erro ao atualizar o cliente"})
                    return console.error(err);
                }
                res.status(200).json({message: `O Cliente ${nome} foi atualizado com sucesso!`});
                res.end()
            })
        })
        
    })
}