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

module.exports.getConteudo = async function(id_modulo) {
    try {
        let sql = "SELECT * FROM conteudo WHERE modulo_id = ?"
        let modulo = await pool.query(sql, [id_modulo]);
        return {status:200, data: modulo[0]};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }

}



