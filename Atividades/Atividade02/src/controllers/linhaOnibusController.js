import conn from "../config/dbconfig.js";
import {v4 as uuidv4} from "uuid"
// POST,GET(ID), PUT(id), GET
export const pegarLinha = (req,res) =>{
    const selectSQL = /*sql*/ `
    SELECT * FROM linhaonibus`;

    conn.query(selectSQL, (err,data)=>{
        if(err){
            return res.status(500).json({message: "Erro ao buscar a Linha"})
        }

        const linhaonibus = data
        res.status(200).json(linhaonibus)
    })
}

export const criarLinha = (req,res) =>{
    // nome_linha varchar(255) not null,
    // numero_linha varchar(255) not null,
    // itinerario varchar(300) not null

    const {nome_linha, numero_linha, itinerario } = req.body

    if(!nome_linha){
        return res.status(400).json({message: "O nome da Linha não pode ser vazio"});
    }
    if(!numero_linha){
        return res.status(400).json({message: "O número da Linha não pode ser vazio"});
    }
    if(!itinerario){
        return res.status(400).json({message: "O itinerario não pode ser vazio"});
    }


    const checkSql = /*sql*/ `
    SELECT * FROM linhaonibus
    WHERE ?? = ?
    AND ?? = ?
    AND ?? = ?
    `;

    const sqlDataValidade = ["nome_linha", nome_linha, "numero_linha", numero_linha, "itinerario", itinerario]

    conn.query(checkSql, sqlDataValidade, (err,data) =>{
        if(err){
            res.status(500).json({message: "Erro ao buscar a Linha"})
        }
        if(data.length > 0){
            res.status(409).json({message: "Linha já existe na base de dados"})
        }

        const id = uuidv4()
        const insertSQL =  /*sql*/ `
        INSERT INTO linhaonibus(??,??,??,??)
        VALUES(?,?,?,?)`

        const dataInsert = ["linha_id", "nome_linha", "numero_linha", "itinerario", id, nome_linha, numero_linha, itinerario]

        conn.query(insertSQL, dataInsert, (err)=>{
            if(err){
                res.status(500).json({message: "Erro ao cadastrar a Linha"})
                return console.error(err)
            }
            res.status(201).json({message: `A linha ${nome_linha} do numero ${numero_linha} foi cadastrado com sucesso`})
        })
    })
}


export const editarLinha = (req, res) => {
    const { linha_id } = req.params;

    if (!linha_id) {
        return res.status(400).json({ message: "O ID da linha não pode ser vazio" });
    }

    const sql = /*sql*/ `
    SELECT l.linha_id, l.nome_linha, l.numero_linha, l.itinerario,
           o.onibus_id, o.placa, o.modelo, o.ano_fabricacao, o.capacidade
    FROM linhaonibus l
    LEFT JOIN onibus o ON l.linha_id = o.linha_id
    WHERE l.linha_id = ?`;

    conn.query(sql, [linha_id], (err, data) => {
        if (err) {
            res.status(500).json({ message: "Erro ao buscar a linha e os ônibus" });
            return console.error(err);
        }

        if (data.length === 0) {
            res.status(404).json({ message: "Linha não encontrada" });
            return;
        }

        const linha = {
            linha_id: data[0].linha_id,
            nome_linha: data[0].nome_linha,
            numero_linha: data[0].numero_linha,
            itinerario: data[0].itinerario,
            onibus: data.filter(o => o.onibus_id).map(o => ({
                onibus_id: o.onibus_id,
                placa: o.placa,
                modelo: o.modelo,
                ano_fabricacao: o.ano_fabricacao,
                capacidade: o.capacidade
            }))
        };

        res.status(200).json(linha);
    });
};

export const pegarLinhaPorId = (req, res) => {
    const {id} = req.params;
    
    const checkSql = /*sql*/ `
    SELECT * FROM linhaonibus
    WHERE ?? = ?`;
    const checkId = ["linha_id", id]

    conn.query(checkSql, checkId, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar as linhas"})
            return console.error(err);
        }
        const buscaLinha = data.some(linha => linha.linha_id == id);
        if(buscaLinha == false){
            res.status(409).json({message: "Esta linha não foi encontrado na base de dados!"});
            return;
        }
        const linhaonibus = data;
        res.status(200).json(linhaonibus);
    });
}

//pegarLinha, criarLinha, editarLinha, pegarLinhaPorId