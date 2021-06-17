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