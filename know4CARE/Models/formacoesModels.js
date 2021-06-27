var pool = require("./connection");


module.exports.getAllFormacoes = async function(user) {
    try {
        let sql = "SELECT * FROM AcaoFormativa";
        let formacoes = await pool.query(sql);
        if (formacoes.length > 0) {
            return {status: 200, data: formacoes};
        }
        else {
            return {status: 404, data: {msg: "Sem formações!"}};
        } 
    } catch(err) {
        console.log(err);
        return {status: 500, data: err};
    }
}



module.exports.getFormacao = async function(id_formacao) {
    try {
        let sql = "SELECT * FROM AcaoFormativa WHERE id_acao = ?"
        let formacao = await pool.query(sql, [id_formacao]);
        sql = "SELECT * FROM Modulo M, ModuloFormacao F WHERE F.id_formacao = ? AND M.id_modulo = F.modulo_id"
        formacao[0].modulos = await pool.query(sql, [id_formacao]);
        return {status:200, data: formacao[0]};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }

}

module.exports.getConteudos = async function(id_modulo) {
    try {
        let sql = "SELECT * FROM conteudo WHERE modulo_id = ?"
        let conteudos = await pool.query(sql, [id_modulo]);
        return {status:200, data: conteudos};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }

}

module.exports.partiparFormacao = async function(body) {
    try {
        let sql = "INSERT INTO formacaoUtilizador(id_formando, id_formacao) VALUES(?,?)"
        let result = await pool.query(sql, [body.id_formando, body.id_formacao]);
        return {status:200, data: result};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }

}

module.exports.addFormacao = async function(formacao) {
    try {
        let sql = "INSERT INTO AcaoFormativa(nome, estado, imagem, descricao, duracao) VALUES (?,'',?,?,?)";
        let result = await pool.query(sql, [formacao.nome, formacao.imagem, formacao.descricao, formacao.duracao]);
        return {status: 200, data: result};
    } catch(err) {
        console.log(err);
        return {status: 500, data: err};
    }
}



