//Assim que a página dos formandos carregar
window.onload = function () {
    loadFormacoes();
    console.log("teste");

}


async function loadFormacoes() {

    //Carregar os formações para a tabela
    try {

        //Através da API criada vai buscar todos os formações que estão na base de dados
        //e para cada um deles vai criar uma nova "row" na tabela com os respetivos dados
        let formacoes = await $.ajax({
            url: "/api/formacoes",
            method: "get",
            dataType: "json"
        });

        let html = "";
        for (let formacao of formacoes) {

            html += "<tr>";
            html += "<th scope='row'>"+formacao.id_acao+"</th>";
            html += "<td>"+formacao.nome+"</td>"
            html += "<td>"+formacao.descricao+"</td>"
            html += "<td>"+formacao.duracao+"</td>"
            html += "<td><button type='button' class='btn btn-primary' onclick=''><i class='fas fa-edit'></i></button> <button type='button' class='btn btn-danger' onclick=''><i class='far fa-trash-alt'></i></button></td>";

        }

        document.getElementById("formacoes").innerHTML = html;

    } catch(err) {
        console.log(err);
    }

}

function abrirAdicionarFormacao() {

    $('#formacoesModal').modal('show');

    document.getElementById("nome").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("duracao").value = "";
}

async function addFormacao() {

    let nome = document.getElementById("nome").value;
    let imagem = document.getElementById("imagem").value;
    let descricao = document.getElementById("descricao").value;
    let duracao = document.getElementById("duracao").value;

    if (nome != "" && imagem != "" && descricao != "" && duracao != "") {

        let data = {
            nome: nome,
            imagem: imagem,
            descricao: descricao,
            duracao: duracao
        }

        try {

            let formacao = await $.ajax({
                url: "/api/formacoes/nova",
                method: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: "json"
            });

            alert("Formação "+nome+" adicionado com sucesso!");
            window.location = "formacoes.html";

        } catch(err) {
            console.log(err);
        }
    }
    else {
        alert("Preencha os campos acima!");
    }

}

function fecharModal() {
    $('#formacoesModal').modal('hide');
}

function logout() {
    sessionStorage.clear();
    window.location = "index.html";
  }