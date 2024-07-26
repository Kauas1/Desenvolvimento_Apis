import conn from "../config/dbconfig.js";

const linhaOnibusTable = /*sql*/`
    CREATE TABLE IF NOT EXISTS linhaonibus(
        linha_id varchar(60) primary key NOT NULL,
        nome_linha varchar(255) not null,
        numero_linha int not null,
        itinerario varchar(300) not null,

        onibus_id varchar(60) not null,

        foreign key (onibus_id) references onibus(onibus_id)
    );`;

conn.query(linhaOnibusTable, (err,result,field)=>{
    if(err){
        return console.error(err.stack)
    }
    console.log("Tabela linha Onibus criada com sucesso.")
})
