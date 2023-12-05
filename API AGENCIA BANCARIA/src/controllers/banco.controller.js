const connection = require('../configs/mysql.config');
const Validator = require('validatorjs');

function list(req, res) {
    connection.query('SELECT * FROM banco', function (err, result) {
        if (err) return res.json(err.message);

        return res.json(result);
    });
}

function create(req, res) {
    const regras = {
        nome_fantasia: 'required|min:4',
        razao_social: 'required|min:4',
        cnpj: 'required|min:14|max:18',
        numero: 'required|min:1|max:3|numeric'
    };

    let teste = new Validator(req.body, regras);

    if (teste.fails()) return res.json(teste.errors);

    const { nome_fantasia, razao_social, cnpj, numero } = req.body;

    connection.query('INSERT INTO banco VALUES (NULL,?,?,?,?)', [nome_fantasia, razao_social, cnpj, numero], function (err, result) {
        if (err || result.affectedRows == 0) return res.json({ erro: "Ocorreu um erro ao inserir o novo banco." });

        return res.json({ id: result.insertId, nome_fantasia, razao_social, cnpj, numero });
    });
}

function update(req, res) {
    const regras = {
        nome_fantasia: 'required|min:4',
        razao_social: 'required|min:4',
        cnpj: 'required|min:14|max:18',
        numero: 'required|min:1|max:3|numeric'
    };

    let teste = new Validator(req.body, regras);

    if (teste.fails()) return res.json(teste.errors);

    const id_ban = req.params.codigo;
    const { nome_fantasia, razao_social, cnpj, numero } = req.body;

    connection.query('UPDATE banco SET nome_fantasia = ?, razao_social = ?, cnpj = ?, numero = ? WHERE id_ban = ?', [nome_fantasia, razao_social, cnpj, numero, id_ban], function (err, result) {
        if (err || result.affectedRows == 0) return res.json({ erro: "Ocorreu um erro ao atualizar o banco." });

        return res.json({ id: result.insertId, nome_fantasia, razao_social, cnpj, numero });
    });
}

function destroy(req, res) {
    const id_ban = req.params.codigo;

    connection.query('DELETE FROM banco WHERE id_ban = ?;', [id_ban], (err, result) => {
        const response = err || result.affectedRows === 0 ?
            { error: 'Ocorreu um erro ao excluir o banco.' } :
            { success: 'Banco excluído.' };

        res.json(response);
    });
}


module.exports = { list, create, update, destroy };