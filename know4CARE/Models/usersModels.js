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
            //Vai a cada uma das formações que tem e coloca o nr de conteúdos vistos
            for (let formacao of formacoes) {

                sql = "SELECT COUNT(U.id) AS conteudosVistos FROM conteudoUtilizador U, conteudo C, ModuloFormacao M WHERE U.utilizador_id = ? AND U.conteudo_id = C.id_conteudo AND C.modulo_id = M.modulo_id AND M.id_formacao = ?";
                let countConteudosFormacaoVistos = await pool.query(sql, [id, formacao.id_acao]);
                formacao.conteudosVistos = countConteudosFormacaoVistos[0].conteudosVistos;

            }

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

module.exports.formacoesFinalizadas = async function(id) {

    let lista = [];

    try {
        let sql = "SELECT * FROM AcaoFormativa A, formacaoUtilizador U WHERE A.id_acao = U.id_formacao AND U.id_formando = ?";
        let formacoes = await pool.query(sql, [id]);

        if (formacoes.length > 0) {

            for (let formacao of formacoes) {

                sql = "SELECT COUNT(C.id_conteudo) AS conteudosFormacao FROM conteudo C, ModuloFormacao M WHERE M.id_formacao = ? AND M.modulo_id = C.modulo_id";
                let countConteudosFormacao = await pool.query(sql, [formacao.id_acao]);

                sql = "SELECT COUNT(U.id) AS conteudosVistos FROM conteudoUtilizador U, conteudo C, ModuloFormacao M WHERE U.utilizador_id = ? AND U.conteudo_id = C.id_conteudo AND C.modulo_id = M.modulo_id AND M.id_formacao = ?";
                let countConteudosFormacaoVistos = await pool.query(sql, [id, formacao.id_acao]);

                if (countConteudosFormacao[0].conteudosFormacao == countConteudosFormacaoVistos[0].conteudosVistos) {

                    lista.push(formacao);

                }

            }

            return {status: 200, data: lista};
        }
        else {
            return {status: 404, data: {msg: "Sem formacoes"}};
        } 
    } catch(err) {
        console.log(err);
        return {status: 500, data: err};
    }
}