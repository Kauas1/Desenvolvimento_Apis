import conn from "../config/dbconfig";

const clienteTable = /*sql*/ `
    CREATE TABLE IF NOT EXISTS clientes(
        cliente_id varchar(60) primary key not null,
        nome varchar(255) not null,
        email varchar(255) not null,
        senha varchar(255) not null,
        imagem varchar(300) not null,
        disponibilidade boolean,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on current_timestamp
    );`;

    conn.query(clienteTable, (err,result,field)=>{
        if(err){
            return console.error(err.stack)
        }
        console.log("Tabela clientes criada com sucesso.")
    })