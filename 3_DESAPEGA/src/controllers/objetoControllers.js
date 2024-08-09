
import conn from "../config/conn.js";
import {v4 as uuidv4} from "uuid";

import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import { json, response } from "express";

export const create = async (req, res) => {
    const { nome, peso, cor, descricao} = req.body
    const disponivel = 1

    
    if(!nome || nome.length < 3){
        return res.status(400).json("O nome objeto é obrigatorio")
    }
    if(!peso){
        return res.status(400).json("O peso objeto é obrigatorio")
    }
    if(!cor){
        return res.status(400).json("A cor objeto é obrigatorio")
    }
    if(!descricao){
        return res.status(400).json("A descricao objeto é obrigatorio")
    }

    const objeto_id = uuidv4()
    const usuario_id = user.usuario_id
    const insertSql= /*sql*/` INSERT INTO objetos(?? ,??, ??, ??, ??, ??, ??)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const insertData = ["objeto_id", "nome", "peso", "cor", "descricao", "disponivel", "usuario_id", objeto_id, nome, peso, cor, descricao, disponivel, usuario_id];

    conn.query(insertSql, insertData, (err, data)=>{
        if(err){
            console.error(err)
            res.status(500).json({err:"Erro ao cadastra objeto"})
            return
        }

        if(req.files){
            //cadastrar no banco
            const insertImageSql = /*sql*/`INSER INTO objeto_images
            (image_id, objeto_id, image_path) VALUES ?`
            const imageValues = req.flies.map((file)=> [
                uuidv4(),
                objeto_id,
                file.filename
            ])
            conn.query(insertImageSql, [imageValues], (err)=>{
                if(err){
                    console.error(err)
                    res.status(500).json({err: "erro ao salvar imagens do objeto"})
                    return
                }
                res.status.json("Objeto cadastrado com sucesso!")
            })
        } else {
res.status(201).json("Objeto cadastrado com sucesso!")
        }
    })

}

export const getAllObjectUser = async (req, res)=> {
    try{
        const token = getToken (req)
        const user = await getUserByToken(token)

        const usuarioID = user.usuario_id
        const selectSql = /*sql*/`
        SELECT
        obj.objeto_id,
        obj.usuario_id,
        obj.nome,
        obj.peso,
        obj.cor, 
        obj.descricao,
        GROUP_CONCAT(obj_img.image_path ',') AS image_path
        FROM 
            objetos AS obj
        LEFT JOIN
                objeto_images AS obj_img ON obj.objeto_id = obj_img.objeto_id
        WHERE 
            obj.usuario_id = ?
        GROUP BY
            obj.objeto_id, obj_usuario_id, obj.nome, obj.peso, obj.cor, obj.descricao
        `
        conn.query(selectSql, [], (err, data)=> {
            if(err){
                console.error(err)
                res.status(500).json({err:"erro ao buscar objeto"})
                return
            }
            const objetosUsuario = data.map((objeto) =>({
                objeto_id: objeto.objeto_id,
                usuario_id: objeto.usuario_id,
                nome: objeto.nome,
                peso: objeto.peso,
                cor: objeto.cor,
                descricao: objeto.descricao,
                image_paths: objeto.image_paths.split(',')
        }))
    })
        res.status(200).json(objetosUsuario)
    } catch(error){
        console.error(error)
        response.status(500).json({err: "Erro ao processar a requisição."})
    }
}

//Buscar um objeto pelo ID
export const getObjectById = (req,res) =>{
    const {id} = req.params

    const checkSql = /*sql*/ `
    SELECT objeto_id, nome, peso, cor, descricao, disponivel
    FROM objetos
    WHERE ?? = ?
    `

    const checkData = ["objeto_id", id]

    conn.query(checkSql,checkData, (err,data)=>{
        if(err){
            console.error(err)
            res.status(500);json({err: "Erro ao buscar os objetos"})
            return
        }
        if(data.length === 0){
            res.status(404).json({err: "Objeto não encontrado."})
            return
        }

        const objeto = data[0]
        res.status(200).json(objeto)
    })
}