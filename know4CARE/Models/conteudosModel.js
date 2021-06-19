var pool = require("./connection");

module.exports.getConteudo = async function(id) {
    try {
        let sql = "SELECT * FROM conteudo WHERE id_conteudo = ?"
        let conteudo = await pool.query(sql, [id]);
        return {status:200, data: conteudo[0]};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }

}

module.exports.conteudoVisto = async function(body) {
    try {
        let sql = "SELECT * FROM conteudoUtilizador WHERE conteudo_id = ? AND utilizador_id = ?";
        let result = await pool.query(sql, [body.id_conteudo, body.id_utilizador]);
        if (result.length <= 0) {
            sql = "INSERT INTO conteudoUtilizador(conteudo_id, utilizador_id) VALUES(?,?)"
            result = await pool.query(sql, [body.id_conteudo, body.id_utilizador]);
            return {status:200, data: result};
        }
        else {
            return {status: 404, data: {msg: "Conteúdo visto!"}};
        }
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }

}