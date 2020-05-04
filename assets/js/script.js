var inputHipotenusa = document.querySelector("#hip");

var botaoRealizarCalculo = document.querySelector("#bt-calc");
botaoRealizarCalculo.addEventListener("click", function (event){
    //evita que a pagina seja recarregada
    event.preventDefault();
    //pega o formulario e seu conteudo no html
    var form = document.querySelector("#formulario-calc");
    //cria um objeto com as informações que eu preciso (Cateto oposto e adjacente)
    var catetos = obtemCatetosDoFormulario(form);
    //transforma o objeto criado em JSON
    var jsonParaAPI = JSON.stringify(catetos);

    //faz a requisição
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://atlas-231814.appspot.com/calcula");
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            var resposta = xhr.responseText;
            var teorema = JSON.parse(resposta);
            inputHipotenusa.value = teorema.hip;
        }
    }
    xhr.send(jsonParaAPI);
});

function obtemCatetosDoFormulario (form){
    var catetos = {
        cat_op: parseInt(form.cat_op.value),
        cat_adj: parseInt(form.cat_adj.value)
    }
    return catetos;
}