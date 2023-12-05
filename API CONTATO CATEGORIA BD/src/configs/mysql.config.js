// mysql.config.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3360,
  user: 'bruno',
  password: '12345678',
  database: 'api_contatos_bd',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL!');
  }
});

module.exports = connection;
