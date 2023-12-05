const Validator = require('validatorjs');
const connection = require('../configs/mysql.config');

function getTransfer(req, res) {
  const transferCode = req.params.codigo;
  return res.json({ transferName: "Transferência 1" });
}

function listTransfers(req, res) {
  connection.query('SELECT * FROM transferencia', function (err, result) {
    if (err) {
      return res.json({ error: 'Erro ao buscar os dados das transferências' });
    }
    return res.json({ transfers: result });
  });
}

function createTransfer(req, res) {
  const rules = {
    valor: 'required|min:1',
    data_hora: 'required|min:5',
    descricao: 'required|min:5',
    conta_origem_id: 'required|min:5',
    conta_destino_id: 'required|min:5',
  };

  const validation = new Validator(req.body, rules);

  if (validation.fails()) {
    const errors = validation.errors;
    return res.json({ errors });
  }

  const { valor, data_hora, descricao, conta_origem_id, conta_destino_id } = req.body;

  connection.query(
    'INSERT INTO transferencia (valor, data_hora, descricao, conta_origem_id, conta_destino_id) VALUES (?, ?, ?, ?, ?)',
    [valor, data_hora, descricao, conta_origem_id, conta_destino_id],
    function (err, result) {
      if (err) {
        return res.json({ error: 'Erro ao tentar salvar a informação da transferência' });
      }

      if (result.affectedRows === 0) {
        return res.json({ error: 'Erro ao tentar salvar a informação da transferência' });
      }

      return res.json({
        valor,
        data_hora,
        descricao,
        conta_origem_id,
        conta_destino_id,
        id_tra: result.insertId,
      });
    }
  );
}

function updateTransfer(req, res) {
  const transferCode = req.params.codigo;
  const { valor, data_hora, descricao, conta_origem_id, conta_destino_id } = req.body;

  const rules = {
    valor: 'required|min:1',
    data_hora: 'required|min:5',
    descricao: 'required|min:5',
    conta_origem_id: 'required|min:5',
    conta_destino_id: 'required|min:5',
  };

  const validation = new Validator(req.body, rules);

  if (validation.fails()) {
    return res.json(validation.errors);
  } else {
    connection.query(
      'UPDATE transferencia SET valor = ?, data_hora = ?, descricao = ?, conta_origem_id = ?, conta_destino_id = ? WHERE id_tra = ?;',
      [valor, data_hora, descricao, conta_origem_id, conta_destino_id, transferCode],
      function (err, result) {
        if (err) {
          return res.json({ error: err.message });
        }
        if (result.affectedRows === 0) {
          return res.json({ error: 'Falha ao tentar Atualizar a transferência' });
        } else
          return res.json({
            valor,
            data_hora,
            descricao,
            conta_origem_id,
            conta_destino_id,
          });
      }
    );
  }
}

function deleteTransfer(req, res) {
    const transferCode = req.params.codigo;
  
    connection.query('DELETE FROM transferencia WHERE id_tra = ?;', [transferCode], (err, result) => {
      const response = err ? { erro: 'Erro ao excluir a transferência' } :
        (result.affectedRows === 0 ? { erro: 'Falha ao tentar excluir a transferência' } :
          { information: 'Foi excluído com sucesso!' });
  
      res.json(response);
    });
  } // testando novas formas 

module.exports = {
  list: listTransfers,
  getTransfer,
  create: createTransfer,
  update: updateTransfer,
  destroy: deleteTransfer,
};
