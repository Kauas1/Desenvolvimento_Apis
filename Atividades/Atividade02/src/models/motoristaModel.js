import conn from "../config/dbconfig.js";

const motoristaTable = /*sql*/`
    CREATE TABLE IF NOT EXISTS motoristas(
        motorista_id int primary key not null,
        nome varchar(255) not null,
        data_nascimento YEAR(4) not null,
        numero_carteira_habilitacao varchar(255) not null
        
    );
`

conn.query(motoristaTable, (err,result,field)=>{
    if(err){
        return console.error(err.stack)
    }
    console.log("Tabela motorista criada com sucesso.")
})