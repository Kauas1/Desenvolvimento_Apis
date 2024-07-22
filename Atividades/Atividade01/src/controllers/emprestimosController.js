import conn from "../config/dbconfig";
import {v4 as uuidv4} from "uuid"

export const pegarEmprestimos = (req,res) =>{
    const sql = `SELECT * FROM emprestimos`
    conn.query(sql, (err, data)=>{
        if(err){
            console.error(err)
            res.status(500).json({message: "Erro ao buscar  os emprestimos"})
            return
        }

        const emprestimos = data
        res.status(200).json({message:""})
    })
}

export const criarEmprestimos = (req, res) =>{
    
}