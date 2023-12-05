const connection = require('../configs/mysql.config');
const Validator = require('validatorjs');

function listClientes(req, res) {
    connection.query('SELECT * FROM cliente', function (err, result) {
        if (err) return res.json({ error: 'Erro ao buscar os dados dos clientes.' });

        return res.json({ clients: result });
    });
}

function createCliente(req, res) {
    const rules = {
        nome: 'required|min:4',
        cpf_cnpj: 'required|min:11|max:18',
        rg: 'required|min:4',
        sexo: 'required|max:1',
        data_nasc: 'required|date',
        renda: 'required|double',
        endereco: 'required|min:4',
        email: 'required|email',
        telefone: ['required', 'regex:/^\\(\\d{2}\\)\\s?\\d\\d{4}\\-\\d{4}$/']
    };

    let validator = new Validator(req.body, rules);

    if (validator.fails()) return res.json({ errors: validator.errors });

    const { nome, cpf_cnpj, rg, sexo, data_nasc, renda, endereco, email, telefone } = req.body;

    connection.query('INSERT INTO cliente VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [nome, cpf_cnpj, rg, sexo, data_nasc, renda, endereco, email, telefone], function (err, result) {
        if (err || result.affectedRows === 0) return res.json({ error: "Não foi possível inserir o cliente." });

        return res.json({ id: result.insertId, nome, sexo, renda, email, telefone });
    });
}

function updateCliente(req, res) {
    const rules = {
        nome: 'required|min:4',
        cpf_cnpj: 'required|min:11|max:18',
        rg: 'required|min:4',
        sexo: 'required|max:1',
        data_nasc: 'required|date',
        renda: 'required|double',
        endereco: 'required|min:4',
        email: 'required|email',
        telefone: ['required', 'regex:/^\\(\\d{2}\\)\\s?\\d\\d{4}\\-\\d{4}$/']
    };

    let validator = new Validator(req.body, rules);

    if (validator.fails()) return res.json({ errors: validator.errors });

    const id_cli = req.params.codigo;
    const { nome, cpf_cnpj, rg, sexo, data_nasc, renda, endereco, email, telefone } = req.body;

    connection.query('UPDATE cliente SET nome = ?, cpf_cnpj = ?, rg = ?, sexo = ?, data_nasc = ?, renda = ?, endereco = ?, email = ?, telefone = ? WHERE id_cli = ?;', [nome, cpf_cnpj, rg, sexo, data_nasc, renda, endereco, email, telefone, id_cli], function (err, result) {
        if (err || result.affectedRows === 0) return res.json({ error: "Não foi possível atualizar o cliente." });

        return res.json({ id: result.insertId, nome, sexo, renda, email, telefone });
    });
}

function destroyCliente(req, res) {
    const id_cli = req.params.codigo;

    connection.query('DELETE FROM cliente WHERE id_cli = ?;', [id_cli], (err, result) => {
        const response = err || result.affectedRows === 0 ?
            { error: 'Não foi possível excluir o cliente.' } :
            { success: 'Cliente excluído.' };

        res.json(response);
    });
}


module.exports = { listClientes, createCliente, updateCliente, destroyCliente };