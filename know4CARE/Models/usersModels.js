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

