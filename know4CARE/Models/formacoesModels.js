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


