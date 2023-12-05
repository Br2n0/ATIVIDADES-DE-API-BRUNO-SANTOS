CREATE DATABASE IF NOT EXISTS api_contatos_db;

USE api_contatos_db;

CREATE TABLE IF NOT EXISTS categorias(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT
);

CREATE TABLE IF NOT EXISTS contatos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    id_categoria_fk INT NOT NULL,
    FOREIGN KEY (id_categoria_fk) REFERENCES categorias(id)
);

#DROP DATABASE api_contatos_db;