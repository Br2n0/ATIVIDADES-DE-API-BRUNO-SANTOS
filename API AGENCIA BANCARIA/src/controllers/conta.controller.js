const Validator = require('validatorjs');
const connection = require('../configs/mysql.config');

function show(req, res) { //achei melhor utilizar esra função a apartir
  const accountCode = req.params.codigo;
  return res.json({ accountName: "conta 1" });
}

function list(request, response) {
  connection.query('SELECT * FROM conta', function (err, result) {
    if (err) {
      return response.json({ error: 'Erro ao buscar os dados das contas' });
    }
    return response.json({ accounts: result });
  });
}

function create(request, response) {
  const rules = {
    numero: 'required|min:1',
    data_abertura: 'required|min:5',
    saldo: 'required|min:5',
    valor_limite: 'required|min:1',
    agencia_id: 'required|min:1',
    cliente_id: 'required|min:1',
  };

  const validation = new Validator(request.body, rules);

  if (validation.fails()) {
    const errors = validation.errors;
    return response.json({ errors });
  }

  const { numero, data_abertura, saldo, valor_limite, agencia_id, cliente_id } = request.body;

  connection.query(
    'INSERT INTO conta (numero, data_abertura, saldo, valor_limite, agencia_id, cliente_id) VALUES (?, ?, ?, ?, ?, ?)',
    [numero, data_abertura, saldo, valor_limite, agencia_id, cliente_id],
    function (err, result) {
      if (err) {
        return response.json({ error: 'Erro ao tentar salvar a informação da conta' });
      }

      if (result.affectedRows == 0) {
        return response.json({ error: 'Erro ao tentar salvar a informação da conta' });
      }

      return response.json({
        numero,
        data_abertura,
        saldo,
        valor_limite,
        agencia_id,
        cliente_id,
        id_con: result.insertId
      });
    });
}

function update(req, res) {
  const accountCode = req.params.codigo;
  const { numero, data_abertura, saldo, valor_limite, agencia_id, cliente_id } = req.body;

  const rules = {
    numero: 'required|min:1',
    data_abertura: 'required|min:5',
    saldo: 'required|min:5',
    valor_limite: 'required|min:5',
    agencia_id: 'required|min:1',
    cliente_id: 'required|min:1',
  };

  const validation = new Validator(req.body, rules);

  if (validation.fails()) {
    return res.json(validation.errors);
  } else {
    connection.query(
      'UPDATE conta SET numero = ?, data_abertura = ?, saldo = ?, valor_limite = ?, agencia_id = ?, cliente_id = ? WHERE id_con = ?;',
      [numero, data_abertura, saldo, valor_limite, agencia_id, cliente_id, accountCode],
      function (err, result) {
        if (err) {
          return res.json({ error: err.message });
        }
        if (result.affectedRows == 0) {
          return res.json({ error: 'Falha ao tentar atualizar a conta' });
        } else {
          return res.json({
            numero,
            data_abertura,
            saldo,
            valor_limite,
            agencia_id,
            cliente_id
          });
        }
      });
  }
}

function destroy(req, res) {
    const accountCode = req.params.codigo;

    connection.query('DELETE FROM conta WHERE id_con = ?;', [accountCode], (err, result) => {
        const response = err ? { erro: 'Erro ao excluir a conta' } :
            (result.affectedRows === 0 ? { erro: 'Falha ao tentar excluir a conta' } :
                { information: 'Conta excluída com sucesso!' });

        res.json(response);
    });
}


module.exports = { list, show, create, update, destroy };
