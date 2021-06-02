var pool = require("./connection");



/* login  */
module.exports.login = async function(user) {
    try {
        let sql = "SELECT * FROM Utilizador WHERE email = ? AND codigo = ?";
        let utilizador = await pool.query(sql,[user.email, user.codigo] );
        if (utilizador.length > 0) {
            return {status: 200, data: utilizador[0]};
        }
        else {
            return {status: 404, data: {msg: "Email ou palavra passe incorretos"}};
        } 
    } catch(err) {
        console.log(err);
        return {status: 500, data: err};
    }
}

module.exports.loadFormandos = async function() {
    try {
        let sql = "SELECT id_user, nome, DATE_FORMAT(data_nasc, '%d-%m-%y') AS data_nasc, email, codigo, instituicao FROM Utilizador WHERE categoria_id = 2";
        let utilizador = await pool.query(sql);
        if (utilizador.length > 0) {
            return {status: 200, data: utilizador};
        }
        else {
            return {status: 404, data: {msg: "Nenhum formando!"}};
        } 
    } catch(err) {
        console.log(err);
        return {status: 500, data: err};
    }
}

module.exports.addFormando = async function(formando) {
    try {
        let sql = "INSERT INTO Utilizador(nome, data_nasc, email, codigo,instituicao, categoria_id) VALUES (?,?,?,?,?,2)";
        let utilizador = await pool.query(sql, [formando.nome, formando.data_nasc, formando.email, formando.codigo,formando.instituicao]);
        return {status: 200, data: utilizador};
    } catch(err) {
        console.log(err);
        return {status: 500, data: err};
    }
}

module.exports.removerFormando = async function(id) {
    try {
        let sql = "DELETE FROM Utilizador WHERE id_user = ?";
        let utilizador = await pool.query(sql, [id]);
        return {status: 200, data: utilizador};
    } catch(err) {
        console.log(err);
        return {status: 500, data: err};
    }
}

module.exports.editarFormando = async function(formando) {
    try {
        let sql = "UPDATE Utilizador SET nome = COALESCE(?,nome), data_nasc = COALESCE(?,data_nasc), email = COALESCE(?,email), codigo = COALESCE(?,codigo), instituicao = COALESCE(?,instituicao) WHERE id_user = ?";
        let utilizador = await pool.query(sql, [formando.nome, formando.data_nasc, formando.email, formando.codigo, formando.instituicao, formando.id]);
        return {status: 200, data: utilizador};
    } catch(err) {
        console.log(err);
        return {status: 500, data: err};
    }
}

module.exports.getByIdFormando = async function(id) {
    try {
        let sql = "SELECT id_user, nome, DATE_FORMAT(data_nasc, '%Y-%m-%d') AS data_nasc, email, codigo, instituicao FROM Utilizador WHERE id_user = ?";
        let utilizador = await pool.query(sql, [id]);
        if (utilizador.length > 0) {
            return {status: 200, data: utilizador[0]};
        }
        else {
            return {status: 404, data: {msg: "Não existe nenhum utilizador com este Id!"}};
        } 
    } catch(err) {
        console.log(err);
        return {status: 500, data: err};
    }
}

module.exports.getFormacoesUtilizador = async function(id) {
    try {
        let sql = "SELECT F.id_acao, F.nome, F.estado, F.imagem FROM AcaoFormativa F, formacaoUtilizador U WHERE F.id_acao = U.id_formacao AND U.id_formando = ?";
        let formacoes = await pool.query(sql, [id]);
        if (formacoes.length > 0) {
            return {status: 200, data: formacoes};
        }
        else {
            return {status: 404, data: {msg: "Não está a participar em nenhuma formação"}};
        } 
    } catch(err) {
        console.log(err);
        return {status: 500, data: err};
    }
}