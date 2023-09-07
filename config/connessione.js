const { Sequelize } = require("sequelize");

//attenti, se qualche cosa andasse storto nella connessione? Sarebbe meglio utilizzare un try catch
/*
const connessione = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PSSW, {
  host: process.env.DB_CONNESSIONE,
  dialect: 'mariadb',
  operatorAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
*/
const connessione = new Sequelize('utenticoi_1', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  operatorAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
module.exports = connessione;