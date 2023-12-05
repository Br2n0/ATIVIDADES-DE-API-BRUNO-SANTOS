const Validator = require('validatorjs');
const connection = require('../configs/mysql.config');

function list(req, res) {
    connection.query('SELECT * FROM agencia', function (err, result) {
        if (err) return res.json({ erro: 'Ocorreram erros ao buscar os dados' });

        return res.json({ dados: result });
    });
}

function create(req, res) {
    const regras = {
        numero: 'required|min:1',
        nome_fantasia: 'required|min:5',
        razao_social: 'required|min:5',
        cnpj: 'required|min:1',
        telefone: 'required|min:1',
        email: 'required|min:1',
        ban_id: 'required|min:1',
    };

    const validacao = new Validator(req.body, regras);

    if (validacao.fails()) {
        const erros = validacao.errors;
        return res.json({ erros });
    }

    const { numero, nome_fantasia, razao_social, cnpj, telefone, email, ban_id } = req.body;

    connection.query(
        'INSERT INTO agencia (numero, nome_fantasia, razao_social, cnpj, telefone, email, ban_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [numero, nome_fantasia, razao_social, cnpj, telefone, email, ban_id],
        function (err, result) {
            if (err || result.affectedRows === 0) {
                return res.json({ erro: 'Ocorreram erros ao tentar salvar a informação' });
            }

            return res.json({
                numero,
                nome_fantasia,
                razao_social,
                cnpj,
                telefone,
                email,
                ban_id,
                id_age: result.insertId,
            });
        }
    );
}

function update(req, res) {
    const codigo = req.params.codigo;
    const { numero, nome_fantasia, razao_social, cnpj, telefone, email, ban_id } = req.body;

    const regras = {
        numero: 'required|min:1',
        nome_fantasia: 'required|min:5',
        razao_social: 'required|min:5',
        cnpj: 'required|min:1',
        telefone: 'required|min:1',
        email: 'required|min:1',
        ban_id: 'required|min:1',
    };

    const validacao = new Validator(req.body, regras);

    if (validacao.fails()) {
        return res.json(validacao.errors);
    }

    connection.query(
        'UPDATE agencia SET numero = ?, nome_fantasia = ?, razao_social = ?, cnpj = ?, telefone = ?, email = ?, ban_id = ? WHERE id_age = ?;',
        [numero, nome_fantasia, razao_social, cnpj, telefone, email, ban_id, codigo],
        function (err, result) {
            if (err || result.affectedRows === 0) {
                return res.json({ erro: 'Falha ao tentar Atualizar' });
            }

            return res.json({
                numero,
                nome_fantasia,
                razao_social,
                cnpj,
                telefone,
                email,
                ban_id,
            });
        }
    );
}

function destroy(req, res) {
    const codigo = req.params.codigo;

    connection.query('DELETE FROM agencia WHERE id_age = ?;', [codigo], (err, result) => {
        const response = err || result.affectedRows === 0 ?
            { erro: 'Falha ao tentar excluir agência.' } :
            { information: 'Agência excluída.' };

        res.json(response);
    });
}


module.exports = { list, create, update, destroy };