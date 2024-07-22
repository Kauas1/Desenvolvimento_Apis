import conn from "../config/dbconfig";

const livroTable = /*sql*/ `
    CREATE TABLE IF NOT EXISTS livros(
    livro_id varchar(60) primary key not null unique,
    titulo varchar(255) not null,
    autor varchar(255) not null,
    ano_publicacao YEAR(4) not null,
    genero varchar(255) not null,
    preco DOUBLE(10, 2) not null,
    disponibilidade boolean default 1,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
    );`;

    conn.query(livroTable, (err, result,field)=>{
        if(err){
            return console.error(err.stack)
        }
        console.log("Tabela de livros criada com sucesso.")
    })