var user = JSON.parse(sessionStorage.getItem("user"));

window.onload = async function () {

    loadMinhasFormacoes();

    document.getElementById("username").innerHTML = user.nome;

}

async function loadMinhasFormacoes() {

    try {

        let formacoes = await $.ajax({
            url: "/api/users/formandos/"+user.id_user+"/formacoes",
            method: "get",
            dataType: "json"
        });

        let html = "";
        for (let formacao of formacoes) {
            html += "<details>";
            html += "<summary style='color: #124265'>"+formacao.nome+"</summary>";

            try {

                let formacaoInfo = await $.ajax({
                    url: "/api/formacoes/formacao/"+formacao.id_acao,
                    method: "get",
                    dataType: "json"
                });
        
                for (let modulo of formacaoInfo.modulos) {

                    html += "<details style='margin: 0; padding: 0; margin-left: 10px;'>";
                    html += "<summary style='color: #124265'>"+modulo.nome+"</summary>";
                    html += "<ul>";
                    html += "<li style='margin: 0; padding: 0; margin-left: 10px;'>Objetivo</li>";
                    html += "<li style='margin: 0; padding: 0; margin-left: 10px;'>Conteudo</li>";
                    html += "<li style='margin: 0; padding: 0; margin-left: 10px;'><a href='quiz.html'>Quiz</a></li>";
                    html += "</ul>";
                    html += "</details>";

                }
        
        
            } catch(err) {
                console.log(err);
            }
            html += "</details>";
            html += "</details>";
        }

        document.getElementById("minhasFormacoes").innerHTML = html;
        

    } catch(err) {
        console.log(err);
    }


}