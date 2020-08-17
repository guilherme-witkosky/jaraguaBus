document.getElementById('mostrar').addEventListener("click", function(){
    buscaCadastro(0);
});

document.getElementById('btnId').addEventListener("click", function(){
    buscaCadastro(1);
});

document.getElementById('btnNome').addEventListener("click", function(){
    buscaCadastro(2);
});

document.getElementById('btnEmail').addEventListener("click", function(){
    buscaCadastro(3);
});

document.getElementById('btnComent').addEventListener("click", function(){
    buscaCadastro(4);
});

function buscaCadastro(valor){

    if(valor===0){
       var url = '/select';
    }

    if(valor===1){
       var consultaId = Number(prompt('Digite um ID: '));
            if(consultaId!==0){
                var url = '/select/' + consultaId;
            }
    }

    if(valor===2){
       var consultaNome = prompt('Digite um nome: ');
            if(consultaNome!==null){
                var url = '/select/nome/' + consultaNome;
            }
    }

    if(valor===3){
       var consultaEmail = prompt('Digite um email: ');
            if(consultaEmail!==null){
                var url = '/select/email/' + consultaEmail;
            }
    }

    if(valor===4){
        var consultaComent = prompt('Digite um comentário: ');
             if(consultaComent!==null){
                 var url = '/select/coment/' + consultaComent;
             }
     }
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {

        if (xhr.readyState == 4 && xhr.status == 200) {

            var obj = JSON.parse(xhr.responseText);

            var tabela = '';

            tabela += "<table style='border-collapse: collapse; border: 1px solid black; width: 100%;'>" + 
            "<tr border: 1px solid black;><td style='height: 5%'>Update</td><td style='height: 5%'>Delete</td><td style='height: 15%'>Id</td><td style='height: 10%'>Nome</td><td style='height: 15%'>Email</td><td>Comentário</td></tr>";
            for(x=0; x < obj.length; x++ ){
                tabela += "<tr><td style='height: 5%'><a onclick='update(" + obj[x].id + ")' href='#'>Update</a></td><td style='height: 5%'><a onclick='confirmaDelete(" + obj[x].id + ")' href='#'>Delete</a></td><td style='height: 15%'>" + obj[x].id + "</td><td style='height: 10%'>" + obj[x].nome + "</td><td style='height: 15%'>" + obj[x].email +  "</td><td style='height: 15%'>" + obj[x].coment + "</td></tr>";
            }

            tabela += "</table>"

            document.getElementById('resultado').innerHTML = tabela;
        }
}
    xhr.send(); 

}

function update(x){
    var novoNome = prompt("Digite o nome: ");
    var novoEmail = prompt("Digite o email: ");
    var novoComent = prompt("Digite o comentário: ");

    if(novoNome!==null && novoEmail!==null && novoComent!==null){
      window.location.href = '/update/' + novoNome + '/' + novoEmail + '/' + novoComent + '/' + x;  
    }
    
}

function confirmaDelete(x){
    if(confirm("Quer apagar este dado?")){
        window.location.href = '/delete/' + x;
    }
}