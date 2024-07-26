import conn from "../config/dbconfig.js";

const OnibusTable = /*sql*/`
    CREATE TABLE IF NOT EXISTS onibus(
        onibus_id varchar(60) primary key NOT NULL,
        placa varchar(255) not null,
        modelo varchar(255) not null,
        ano_fabricacao YEAR(4),
        capacidade float
    );`;

conn.query(OnibusTable, (err,result,field)=>{
    if(err){
        return console.error(err.stack)
    }
    console.log("Tabela Onibus criada com sucesso.")
})
