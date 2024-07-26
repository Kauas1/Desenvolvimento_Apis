import conn from "../config/dbconfig.js";
import {v4 as uuidv4} from "uuid"


export const criarOnibus = (req, res) => {
    
    const {placa, modelo, ano_fabricacao, capacidade, motorista_id} = req.body;

    if(!placa){
        return res.status(400).json({message: "A placa não pode ser vazio"});
    }
    if(!modelo){
        return res.status(400).json({message: "O modelo não pode ser vazio"});
    }
    if(!ano_fabricacao){
        return res.status(400).json({message: "O ano de publicacao não pode ser vazio"});
    }
    if(!capacidade){
        return res.status(400).json({message: "O capacidade não pode ser vazio"});
    }
    if(!motorista_id){
        return res.status(400).json({message: "O id do motorista não pode ser vazio"})
    }

    
    const checkSql = /*sql*/ `
    SELECT * FROM Onibus
    WHERE ?? = ?
    AND ?? = ?
    AND ?? = ?
    AND ?? = ?
    AND ?? = ?`;
    
    const sqlDataValidate = ["placa", placa, "modelo", modelo, "ano_fabricacao", ano_fabricacao, "capacidade", capacidade, "motorista_id", motorista_id]
    
    conn.query(checkSql, sqlDataValidate, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os Ônibus"})
            return console.error(err);
        }
        if(data.length > 0){
            res.status(409).json({message: "Ônibus já existe na base de dados"});
            return;
        }

        const id = uuidv4();
        const insertSQL = /*sql*/ `
        INSERT INTO Onibus(??, ??, ??, ??, ??, ??)
        VALUES(?, ?, ?, ?, ?, ?)`;

        const dataInsert = ["onibus_id", "placa", "modelo", "ano_fabricacao", "capacidade", "motorista_id", id, placa, modelo, ano_fabricacao, capacidade, motorista_id];

        conn.query(insertSQL, dataInsert, (err) => {
            if(err){
                res.status(500).json({message: "erro ao cadastrar o Ônibus"})
                return console.error(err);
            }
            res.status(201).json({message: `O Onibus ${placa} do modelo ${modelo} foi cadastrado!`});
        });
    })
}

export const pegarOnibusPorId = (req, res) => {
    const {id} = req.params;
    
    const checkSql = /*sql*/ `
    SELECT * FROM Onibus
    WHERE ?? = ?`;
    const checkId = ["onibus_id", id]
    conn.query(checkSql, checkId, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os Ônibus"})
            return console.error(err);
        }
        const buscaOnibus = data.some(Onibus => Onibus.onibus_id == id);
        if(buscaOnibus == false){
            res.status(409).json({message: "Este Onibus não foi encontrado na base de dados!"});
            return;
        }
        const Onibus = data;
        res.status(200).json(Onibus);
    });
}

export const pegarOnibus = (req, res) => {
    const selectSQL = /*sql*/`
    SELECT * FROM onibus`

    conn.query(selectSQL, (err, data) => {
        if(err){
            return res.status(500).json({message: "erro ao buscar Onibus"});
        }

        const onibus = data;
        res.status(200).json(onibus);
    })
};


