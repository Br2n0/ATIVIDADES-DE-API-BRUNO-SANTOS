const Validator = require('validatorjs');
const connection = require('../configs/mysql.config');

function show(req, res) {
  const codigo = req.params.codigo;

  if (codigo == undefined) {
    return res.json({ erro: 'Ocorreram erros ao buscar a informação' });
  }

  connection.query('SELECT * FROM categorias WHERE id = ?', [codigo], function (err, resultado) {

    if (err) {
      return res.json({ erro: 'Ocorreram erros ao tentar buscar a informação' });
    }

    if (resultado.length == 0) {
      return res.json({ erro: `O código #${codigo} não foi encontrado!` });
    }

    return res.json(resultado[0]);

  });
}

function list(req, res) {
  connection.query('SELECT * FROM categoria', function (err, resultado) {
    if (err) {
      return res.json({ erro: 'Ocorreram erros ao buscar os dados' });
    }
    return res.json({ dados: resultado });
  });
}

function create(req, res) {
  const regras = {
    nome: 'required|min:5',
    descricao: 'required',
  };

  const validacao = new Validator(req.body, regras);

  if (validacao.fails()) {
    return res.json(validacao.errors);
  }

  const { nome, descricao } = req.body;

  connection.query('INSERT INTO categoria (nome, descricao) VALUES (?, ?)', [nome, descricao], function (err, resultado) {

    if (err) {
      return res.json({ erro: 'Ocorreram erros ao tentar salvar a informação' });
    }

    if (resultado.affectedRows == 0) {
      return res.json({ erro: 'Ocorreram erros ao tentar salvar a informação' });
    }

    return res.json({
      nome,
      descricao,
      id: resultado.insertId
    });

  });
}

function update(req, res) {
  const codigo = req.params.codigo;

  const nome = req.body.nome;
  const descricao = req.body.descricao;

  if (nome == undefined || nome == "") {
    return res.json({ erro: "Nome não pode ser vazio" });
  }

  connection.query(
    'UPDATE categoria SET nome = ?, descricao = ? WHERE id = ?',
    [nome, descricao, codigo],
    function (err, resultado) {
      if (err) {
        return res.json({
          erro: "Ocorreu um erro ao tentar atualizar a categoria",
        });
      }

      if (resultado.affectedRows === 0) {
        return res.status(500).json({
          erro: "Nenhuma categoria foi atualizada",
        });
      }

      return res.json({
        mensagem: "Categoria atualizada com sucesso",
        categoria: {
          nome,
          descricao,
          id: codigo,
        },
      });
    }
  );
}

function destroy(req, res) {
  const codigo = req.params.codigo;

  connection.query('DELETE FROM categoria WHERE id = ?', [codigo], function (err, resultado) {
    if (err) {
      return res.json({ erro: "Ocorreu um erro ao tentar excluir a categoria" });
    }

    if (resultado.affectedRows === 0) {
      return res.status(500).json({ erro: `Categoria #${codigo} não foi encontrada` });
    }

    return res.json({ mensagem: `Categoria #${codigo} excluída com sucesso` });
  });
}

module.exports = { show, list, create, update, destroy };
