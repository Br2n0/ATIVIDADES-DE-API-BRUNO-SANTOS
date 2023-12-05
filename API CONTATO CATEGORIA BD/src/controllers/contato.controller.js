const Validator = require('validatorjs');
const connection = require('../configs/mysql.config');

function show(req, res) {
  const codigo = req.params.codigo;

  if (codigo == undefined) {
    return res.json({ erro: 'Ocorreram erros ao buscar a informação' });
  }

  connection.query('SELECT * FROM contatos WHERE id = ?', [codigo], function (err, resultado) {

    if (err) {
      return res.json({ erro: 'Ocorreram erros ao tentar buscar a informação' });
    }

    if (resultado.length == 0) {
      return res.json({ erro: `O código #${codigo} não foi encontrado!` });
    }

    return res.json(resultado[0]);

  });
}

function list(request, response) {
  connection.query('SELECT * FROM contatos', function (err, resultado) {
    if (err) {
      return response.json({ erro: 'Ocorreram erros ao buscar os dados' });
    }
    return response.json({ dados: resultado });
  });
}

function create(request, response) {

  const regras = {
    nome: 'required|min:5',
    data_nasc: 'required|date',
    telefone: 'required',
    email: 'required|email',
  };

  const validacao = new Validator(request.body, regras);

  if (validacao.fails()) {
    return response.json(validacao.errors);
  }

  const { nome, data_nasc, telefone, email } = request.body;

  connection.query('INSERT INTO contatos (nome, data_nasc, telefone, email) VALUES (?, ?, ?, ?)', [
    nome, data_nasc, telefone, email
  ], function (err, resultado) {

    if (err) {
      return response.json({ erro: 'Ocorreram erros ao tentar salvar a informação' });
    }

    if (resultado.affectedRows == 0) {
      return response.json({ erro: 'Ocorreram erros ao tentar salvar a informação' });
    }

    return response.json({
      nome,
      data_nasc,
      telefone,
      email,
      id: resultado.insertId
    });

  });
}

function update(request, response) {
  const codigo = request.params.codigo;

  const nome = request.body.nome;
  const data_nasc = request.body.data_nasc;
  const telefone = request.body.telefone;
  const email = request.body.email;

  if (nome == undefined || nome == "" || data_nasc == undefined || data_nasc == "") {
    return response.json({ erro: "Informação incompleta" });
  }

  connection.query(
    'UPDATE contatos SET nome = ?, data_nasc = ?, telefone = ?, email = ? WHERE id = ?',
    [nome, data_nasc, telefone, email, codigo],
    function (err, resultado) {
      if (err) {
        return response.json({
          erro: "Ocorreu um erro ao tentar atualizar o contato",
        });
      }

      if (resultado.affectedRows === 0) {
        return response.status(500).json({
          erro: "Nenhum contato foi atualizado",
        });
      }

      return response.json({
        mensagem: "Contato atualizado com sucesso",
        contato: {
          nome,
          data_nasc,
          telefone,
          email,
          id: codigo,
        },
      });
    }
  );
}

function destroy(request, response) {
  const codigo = request.params.codigo;

  connection.query('DELETE FROM contatos WHERE id = ?', [codigo], function (err, resultado) {
    if (err) {
      return response.json({ erro: "Ocorreu um erro ao tentar excluir o contato" });
    }

    if (resultado.affectedRows === 0) {
      return response.status(500).json({ erro: `Contato #${codigo} não foi encontrado` });
    }

    return response.json({ mensagem: `Contato #${codigo} excluído com sucesso` });
  });
}

module.exports = { show, list, create, update, destroy };
