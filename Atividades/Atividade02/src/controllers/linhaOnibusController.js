import conn from "../config/dbconfig.js";

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

    const {nome_linha, numero_linha, itinerario, onibus_id} = req.body

    if(!nome_linha){
        return res.status(400).json({message: "O nome da Linha não pode ser vazio"});
    }
    if(!numero_linha){
        return res.status(400).json({message: "O número da Linha não pode ser vazio"});
    }
    if(!itinerario){
        return res.status(400).json({message: "O itinerario não pode ser vazio"});
    }
    if(!onibus_id){
        return res.status(400).json({message: "O itinerario não pode ser vazio"});
    }

    const checkSql = /*sql*/ `
    SELECT * FROM linhaonibus
    WHERE ?? = ?
    AND ?? = ?
    AND ?? = ?
    AND ??= ?
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
  
    // linha_id varchar(60) primary key NOT NULL,
    // nome_linha varchar(255) not null,
    // numero_linha int not null,
    // itinerario varchar(300) not null,

    // onibus_id varchar(60) not null,

    const {nome_linha, numero_linha, itinerario, onibus_id} = req.body;

    if(!nome_linha){
        return res.status(400).json({message: "O nome_linha não pode ser vazio"});
    }
    if(!numero_linha){
        return res.status(400).json({message: "O numero_linha não pode ser vazio"});
    }
    if(!itinerario){
        return res.status(400).json({message: "O ano de publicacao não pode ser vazio"});
    }
    if(!onibus_id){
        return res.status(400).json({message: "O onibus_id não pode ser vazio"});
    }

    const checkSql = /*sql*/ `
    SELECT * FROM linhaonibus
    WHERE ?? = ?`;

    const checkId = ["linha_id", id];

    conn.query(checkSql, checkId, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar as linhas"})
            return console.error(err);
        }
        if(data.length == 0){
            res.status(409).json({message: "Esta linha não foi encontrado na base de dados!"});
            return;
        }
        const updateSQL = /*sql*/ `
        UPDATE linhaonibus
        SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?
        WHERE ?? = ?
        `
        const editSqlVali = ["nome_linha", nome_linha, "numero_linha", numero_linha, "itinerario", itinerario, "onibus_id", onibus_id, "linha_id", id];

        conn.query(updateSQL, editSqlVali, (err) => {
            if(err){
                res.status(500).json({message: "erro ao editar as linhas"})
                return console.error(err);
            }
            res.status(200).json({message: `Linha ${nome_linha} atualizado com sucesso!`});
            res.end()
        })
    });
}

export const pegarLinhaPorId = (req, res) => {
    const {id} = req.params;
    
    const checkSql = /*sql*/ `
    SELECT * FROM linhaonibus
    WHERE ?? = ?`;
    const checkId = ["onibus_id", id]
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