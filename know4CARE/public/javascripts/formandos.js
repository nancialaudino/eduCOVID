//Assim que a página dos formandos carregar
window.onload = function () {
    loadFormandos();

}


async function loadFormandos() {

    //Carregar os formandos para a tabela
    try {

        //Através da API criada vai buscar todos os formandos que estão na base de dados
        //e para cada um deles vai criar uma nova "row" na tabela com os respetivos dados
        let formandos = await $.ajax({
            url: "/api/users/formandos",
            method: "get",
            dataType: "json"
        });

        let html = "";
        for (let formando of formandos) {

            html += "<tr>";
            html += "<th scope='row'>"+formando.id_user+"</th>";
            html += "<td>"+formando.nome+"</td>"
            html += "<td>"+formando.data_nasc+"</td>"
            html += "<td>"+formando.email+"</td>"
            html += "<td>"+formando.codigo+"</td>"
            html += "<td>"+formando.instituicao+"</td>"
            html += "<td><button type='button' class='btn btn-primary' onclick='abrirModelEditarFormando("+formando.id_user+");'><i class='fas fa-edit'></i></button> <button type='button' class='btn btn-danger' onclick='removerFormando("+formando.id_user+");'><i class='far fa-trash-alt'></i></button></td>";

        }

        document.getElementById("formandos").innerHTML = html;

    } catch(err) {
        console.log(err);
        if (err.status == 404) {
            
        }
    }

}

async function addFormando() {

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let nascimento = document.getElementById("nascimento").value;
    let codigo = document.getElementById("codigo").value;
    let instituicao = document.getElementById("instituicao").value;

    if (nome != "" && email != "" && nascimento != "" && codigo != "" && instituicao!="") {

        let data = {
            nome: nome,
            email: email,
            data_nasc: nascimento,
            codigo: codigo,
            instituicao:instituicao
        }

        try {

            let formando = await $.ajax({
                url: "/api/users/formandos/novo",
                method: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: "json"
            });

            alert("Formando "+nome+" adicionado com sucesso!");
            window.location = "formandos.html";

        } catch(err) {
            console.log(err);
        }
    }
    else {
        alert("Preencha os campos acima!");
    }

}

async function removerFormando(id) {

    try {

        let formando = await $.ajax({
            url: "/api/users/formandos/"+id+"/remover",
            method: "delete",
            dataType: "json"
        });

        alert("Formando removido com sucesso!");
            window.location = "formandos.html";

    } catch(err) {
        console.log(err);
    }

}       


async function editarFormando(id) {

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let nascimento = document.getElementById("nascimento").value;
    let codigo = document.getElementById("codigo").value;
    let instituicao = document.getElementById("instituicao").value;

    let data = {
        nome: nome,
        email: email,
        data_nasc: nascimento,
        codigo: codigo,
        instituicao: instituicao
    }

    try {

        let formando = await $.ajax({
            url: "/api/users/formandos/"+id+"/editar",
            method: "put",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json"
        });

        alert("Formando editado com sucesso!");
        window.location = "formandos.html";

    } catch(err) {
        console.log(err);
    }

}

function abrirAdicionarFormando() {

    $('#formandosModal').modal('show');

    document.getElementById("nome").value = "";
    document.getElementById("nascimento").value = "";
    document.getElementById("email").value = "";
    document.getElementById("codigo").value = "";
    document.getElementById("instituicao").value = "";

    document.getElementById("modalTitle").innerHTML = "Adicionar Formando";
    let btnModal = document.getElementById("btn-modal");
    btnModal.innerHTML = "Adicionar";
    btnModal.onclick = function() {
        addFormando();
    } ;
}

async function abrirModelEditarFormando(id) {

    $('#formandosModal').modal('show');

    try {

        let formando = await $.ajax({
            url: "/api/users/formandos/"+id,
            method: "get",
            dataType: "json"
        });

        document.getElementById("nome").value = formando.nome;
        document.getElementById("nascimento").value = formando.data_nasc;
        document.getElementById("email").value = formando.email;
        document.getElementById("codigo").value = formando.codigo;
        document.getElementById("instituicao").value = formando.instituicao;
        

    } catch(err) {
        console.log(err);
    }

    document.getElementById("modalTitle").innerHTML = "Editar Formando";
    let btnModal = document.getElementById("btn-modal");
        btnModal.innerHTML = "Editar";
        btnModal.onclick = function() {
            editarFormando(id);
    };

}

function fecharModal() {
    $('#formandosModal').modal('hide');
}

function logout() {
    sessionStorage.clear();
    window.location = "index.html";
  }