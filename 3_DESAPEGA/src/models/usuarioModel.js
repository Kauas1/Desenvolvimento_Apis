import conn from "../config/conn.js";

const tableUsuarios = /*sql*/`
    CREATE TABLE IF NOT EXISTS usuarios(
        usuario_id varchar(60) primary key,
        nome varchar(255) not null,
        email varchar(255) not null,
        telefone varchar(255) not null,
        senha varchar(255) not null,
        imagem varchar(255) not null,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

conn.query(tableUsuarios, (err) =>{
    if(err){
        console.error(err)
        return
    }
    console.log("Tabela de [usuarios] criada com sucesso")
})