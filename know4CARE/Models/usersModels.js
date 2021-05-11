var pool = require("./connection");



/* login  */
module.exports.login = async function(user) {
    try {
        let sql = "SELECT * FROM Utilizador WHERE email = ? AND contribuinte = ?";
        let utilizador = await pool.query(sql,[user.email, user.contribuinte] );
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
        let sql = "SELECT id_user, nome, DATE_FORMAT(data_nasc, '%d-%m-%y') AS data_nasc, email, contribuinte FROM Utilizador WHERE categoria_id = 4";
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
        let sql = "INSERT INTO Utilizador(nome, data_nasc, email, contribuinte, categoria_id) VALUES (?,?,?,?,2)";
        let utilizador = await pool.query(sql, [formando.nome, formando.data_nasc, formando.email, formando.contribuinte]);
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
        let sql = "UPDATE Utilizador SET nome = COALESCE(?,nome), data_nasc = COALESCE(?,data_nasc), email = COALESCE(?,email), contribuinte = COALESCE(?,contribuinte) WHERE id_user = ?";
        let utilizador = await pool.query(sql, [formando.nome, formando.data_nasc, formando.email, formando.contribuinte, formando.id]);
        return {status: 200, data: utilizador};
    } catch(err) {
        console.log(err);
        return {status: 500, data: err};
    }
}

module.exports.getByIdFormando = async function(id) {
    try {
        let sql = "SELECT id_user, nome, DATE_FORMAT(data_nasc, '%Y-%m-%d') AS data_nasc, email, contribuinte FROM Utilizador WHERE id_user = ?";
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


