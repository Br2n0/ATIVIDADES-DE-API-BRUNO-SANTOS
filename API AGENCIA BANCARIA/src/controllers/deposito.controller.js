const connection = require('../configs/mysql.config');
const Validator = require('validatorjs');

function getDepositDetails(req, res) { // função show
    const depositCode = req.params.codigo;
    return res.json({ depositName: "Deposito 1" });
}

function listDeposits(req, res) {
    connection.query('SELECT * FROM deposito, conta, cliente WHERE conta_id = id_con AND cliente_id = id_cli;', function (err, result) {
        if (err) return res.json({ error: 'Erro ao buscar os dados dos depósitos' });
        return res.json({ deposits: result });
    });
}

function createDeposit(req, res) {
    const rules = {
        value: 'required|numeric',
        date: 'required|date',
        account_id: 'required|numeric'
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
        const errors = validation.errors;
        return res.json({ errors });
    }

    const { value, date, account_id } = req.body;

    connection.query('UPDATE conta SET saldo = saldo + ? WHERE id_con = ?;', [value, account_id], function (err, result) {
        if (err) return res.json({ error: err.message });
        if (result.affectedRows == 0) return res.json({ error: "Não foi possível atualizar o saldo da conta" });
        res.json({ account: { account_id } });
    });

    connection.query('INSERT INTO deposito (valor, data, conta_id) VALUES (?, ?, ?);', [value, date, account_id], function (err, result) {
        if (err) return res.json({ error: err.message });
        if (result.affectedRows == 0) return res.json({ error: "Não foi possível inserir um depósito" });
        return res.json({ deposit: { id: result.insertId, date, value, account_id } });
    });
}

function updateDeposit(req, res) {
    const depositCode = req.params.codigo;
    const { value, date, account_id } = req.body;

    const rules = {
        value: 'required|numeric',
        date: 'required|date',
        account_id: 'required|numeric'
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
        return res.json(validation.errors);
    } else {
        connection.query(
            'UPDATE deposito SET valor = ?, data = ?, conta_id = ? WHERE id_dep = ?;',
            [value, date, account_id, depositCode],
            function (err, result) {
                if (err) {
                    return res.json({ error: err.message });
                }
                if (result.affectedRows == 0) {
                    return res.json({ error: 'Falha ao tentar atualizar o depósito' });
                } else {
                    return res.json({ value, date, account_id });
                }
            }
        );
    }
}

function deleteDeposit(req, res) {
    const depositCode = req.params.codigo;
    connection.query('DELETE FROM deposito WHERE id_dep = ?;', [depositCode], function (err, result) {
        if (err) return res.json({ error: err.message });
        if (result.affectedRows == 0) return res.json({ error: "Não foi possível excluir o depósito" });
        return res.json({ success: "Depósito excluído!" });
    });
}

module.exports = { list: listDeposits, show: getDepositDetails, create: createDeposit, update: updateDeposit, destroy: deleteDeposit };
