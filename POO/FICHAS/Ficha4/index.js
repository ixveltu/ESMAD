import * as data from "./data.js";

let listUsers = []
listUsers=  data.init();

function listarNivel(nivel){
    let lista = listUsers.filter(user => user.nivel === nivel)
    alert(lista)
}
function somarPontos(nivel){
    soma = 0
    let lista = listUsers.filter(user => user.nivel === nivel)
    let soma = lista.reduce((acc, user) => acc + user.pontos, 0)
    console.log(soma)
}
function VerificarNivel(nivel){
    let lista = listUsers.filter(user => user.nivel === nivel)
    if(lista.length > 0){
        alert("True")
    }else{
        console.log("False")
    }
}
function pesquisarColecionaveis(colecionavel){
    let lista = listUsers.filter(user => user.colecionaveis.includes(colecionavel))
    console.log(lista)
}
function mostrarColecionavel(colecionavel){
    let lista = listUsers.filter(user => user.colecionaveis.includes(colecionavel))
    console.log(lista)
}
function listaTabClass(){
    let lista = listUsers.sort((a,b) => a.pontos - b.pontos)
    alert(lista)
}
function giveReward(nivel){
    if (user.nivel === nivel) {
        user.pontos += 100
    }
    else{
        console.log("Nivel não encontrado")
    }
}
function sumPontos(){
    let soma = listUsers.reduce((acc, user) => acc + user.pontos, 0)
    console.log(soma)
}

let nivel = 3
listarNivel(nivel)
somarPontos(nivel)
VerificarNivel(nivel)
pesquisarColecionaveis(colecionaveis)
mostrarColecionavel(colecionaveis)
listaTabClass()
giveReward(nivel)
sumPontos()
console.log(listUsers)



