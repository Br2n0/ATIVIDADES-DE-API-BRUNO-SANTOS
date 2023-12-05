const connection = require('../configs/mysql.config');
const Validator = require('validatorjs');

function displaySaque(req, res) { // função
    const saqueCode = req.params.codigo;
    return res.json({ saqueName: "Saque 1" });
}

function listSaque(req, res) {
    connection.query('SELECT * FROM saque, conta, cliente WHERE conta_id = id_con AND cliente_id = id_cli;', function (err, result) {
        if (err) {
            return res.json({ error: 'Erro ao buscar os dados de saque' });
        }
        return res.json({ saqueData: result });
    });
}

function createSaque(req, res) {
    const rules = {
        valor: 'required|min:1',
        data_hora: 'required|min:5',
        conta_id: 'required|min:1',
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
        const errors = validation.errors;
        return res.json({ errors });
    }

    const { valor, data_hora, conta_id } = req.body;

    connection.query('UPDATE conta SET saldo = saldo - ? WHERE id_con = ?;', [valor, conta_id], function (err, result) {
        if (err) {
            return res.json({ error: err.message });
        }
        if (result.affectedRows == 0) {
            return res.json({ error: "Falha ao tentar atualizar o saldo da conta" });
        }
        res.json({ conta: { conta_id } });
    });

    connection.query('INSERT INTO saque (valor, data_hora, conta_id) VALUES (?, ?, ?)', [valor, data_hora, conta_id], function (err, result) {
        if (err) {
            return res.json({ error: 'Erro ao tentar salvar o saque' });
        }
        if (result.affectedRows == 0) {
            return res.json({ error: 'Erro ao tentar salvar a informação de saque' });
        }
        res.json({ valor, data_hora, conta_id, id_saq: result.insertId });
    });
}

function updateSaque(req, res) {
    const saqueCode = req.params.codigo;
    const { valor, data_hora, conta_id } = req.body;

    const rules = {
        valor: 'required|min:1',
        data_hora: 'required|min:5',
        conta_id: 'required|min:1',
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
        return res.json(validation.errors);
    } else {
        connection.query('UPDATE saque SET valor = ?, data_hora = ?, conta_id = ? WHERE id_saq = ?;', [valor, data_hora, conta_id, saqueCode], function (err, result) {
            if (err) {
                return res.json({ error: err.message });
            }
            if (result.affectedRows == 0) {
                return res.json({ error: 'Falha ao tentar Atualizar saque' });
            } else {
                return res.json({ valor, data_hora, conta_id });
            }
        });
    }
}

function removeSaque(req, res) {
    const saqueCode = req.params.codigo;

    connection.query('DELETE FROM saque WHERE id_saq = ?;', [saqueCode], (err, result) => {
        const response = err ? { erro: 'Erro ao excluir o saque' } :
            (result.affectedRows === 0 ? { erro: 'Falha ao tentar excluir o saque' } :
                { information: 'Foi excluído com sucesso!' });

        res.json(response);
    });
}


module.exports = {
    displaySaque,// show
    listSaque,
    createSaque,
    updateSaque,
    removeSaque
};
