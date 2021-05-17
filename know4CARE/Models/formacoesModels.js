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

        let sql = "select AcaoFormativa.nome, Modulo.nome from AcaoFormativa join Modulo on AcaoFormativa.modulo_id = Modulo.id_modulo where id_acao=?;"
        let formacao = await pool.query(sql, [id_formacao]);
        return {status:200, data: formacao[0]};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }

}



