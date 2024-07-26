import conn from "../config/dbconfig.js";
import {v4 as uuidv4} from "uuid"

export const pegarMotoristas = (req,res) =>{
    const checkSql = /*sql*/`
    SELECT * FROM motoristas
    `;

    conn.query(checkSql, (err,data) =>{
        if(err){
            res.status(500).json({message: "Erro ao buscar os dados!"})
            return console.error(err)
        }

        const motoristas = data
        res.status(200).json(motoristas)
        res.end()
    })
}

export const criarMotorista = (req,res) =>{
    const {nome, data_nascimento, numero_carteira_habilitacao} = req.body
    // motorista_id int primary key not null AUTO_INCREMENT
    // nome varchar(255) not null,
    // data_nascimento YEAR(4) not null,
    // numero_carteira_habilitacao varchar(255) not null
    if(!nome){
        return res.status(400).json({message: "O nome não pode ser vazio"})
    }
    if(!data_nascimento){
        return res.status(400).json({message: "A data de nascimento não pode ser vazia"})
    }
    if(!numero_carteira_habilitacao){
        return res.status(400).json({message: "O numero da carteira de habilitação não pode ser vazia"})
    }


    const checkSql = /*sql*/`
        SELECT * FROM motoristas
        WHERE ??= ?
        AND ?? = ?
        AND  ?? = ?`;

        const sqlDataValidade = ["nome", nome, "data_nascimento", data_nascimento, "numero_carteira_habilitacao", numero_carteira_habilitacao]

        conn.query(checkSql, sqlDataValidade, (err,data)=>{
            if(err){
                res.status(500).json({message: "Erro ao buscar os motoristas"})
                return console.error(err)
            }
            if(data.length > 0){
                res.status(409).json({message: "Motorista já existe na base de dados"})
            }
            return
        })

        const id = uuidv4()
        const insertSQL = /*sql*/`
        INSERT INTO motoristas(??,??,??,??)
        VALUES(?,?,?,?)`;

        const dataInsert = ["motorista_id", "nome", "data_nascimento", "numero_carteira_habilitacao", id, nome, data_nascimento, numero_carteira_habilitacao]

        conn.query(insertSQL, dataInsert, (err)=>{
            if(err){
                res.status(500).json({message: "Erro ao cadastrar o livro"})
                return console.error(err)
            }
            res.status(201).json({message: `O motorista ${nome} foi cadastrado com sucesso`})
        })
    }

export const pegarMotoristaPorId = (req,res) =>{
    const {id} = req.params;

    const checkSql = /*sql*/ `
    SELECT * FROM motoristas
    WHERE ?? = ?`;

    const checkId = ["onibus_id", id]

    conn.query(checkSql, checkId, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os motoristas"})
            return console.error(err);
        }
        const buscaMotorista = data.some(motoristas => motoristas.motorista_id == id);
        if(buscaMotorista == false){
            res.status(409).json({message: "Este motorista não foi encontrado na base de dados!"});
            return;
        }
        const motoristas = data;
        res.status(200).json(motoristas);
    });
}

export const deletarMotorista = (req,res) =>{
    const {id} = req.params

    const deleteSQL = /*sql*/ `
    DELETE FROM motoristas
    WHERE ?? = ?`;

    const checkId = ["motorista_id", id]
    conn.query(deleteSQL, checkId, (err,info) => {
        if(err){
            res.status(500).json({message:"Erro ao deletar o Motorista"})
        }
        if(info.affectedRows == 0){
            res.status(404).json({messae: "Motorista não encontrado na base de dados"})
        }
        res.status(204);
        res.end()
    })
}