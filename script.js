/*
Script para imagens.
Utilize apenas imagens locais neste vetor, não links externos, não há suporte para outros links
*/

var imagens = [

"imgs/rackers/00.png",
"imgs/rackers/0.gif",
"imgs/rackers/foto1rackers.png",
"imgs/rackers/foto2rackers.png",
"imgs/rackers/foto3rackers.png",
"imgs/rackers/foto4rackers.png",
"imgs/rackers/foto5rackers.png",
"imgs/rackers/foto6rackers.png",
"imgs/rackers/foto7rackers.png",
"imgs/rackers/foto8rackers.png",
"imgs/rackers/foto9rackers.png",
"imgs/rackers/28v.gif",
"imgs/rackers/26v.gif",
"imgs/rackers/29v.gif",
"imgs/rackers/25v.gif",
"imgs/rackers/27v.gif",
"imgs/rackers/22.jpg",
"imgs/rackers/23.jpg",
"imgs/rackers/24.jpg",

    ]; // array com as imagens
var tempo = 6000; // tempo em milissegundos para trocar as imagens
var indice = 0; // indice atual da imagem

function trocarImagem() {
    document.getElementById("minha-imagem").src = imagens[indice];
    indice++;
    if (indice == imagens.length) {
        indice = 0;
    }
    setTimeout(trocarImagem, tempo);
}

window.onload = function () {
    trocarImagem();
};


/*
Script para iframe.
Utilize apenas links embled ou links de outros sites, não arquivos diretos, estes costumam sair fora de formatação
*/

var links = [
    "https://drive.google.com/file/d/1D7oT6xbwJMZOuemyPI0H_0pNxY84dZmJ/preview",
    "https://drive.google.com/file/d/13TPhtzS3TnrHEZlwqdUmhjVoryUHXsfE/preview",
    "https://drive.google.com/file/d/1GagAgdX7h1PhncvP1Snpn5OxQ7YrYS9r/preview",
];
var indice = 0;
var intervalo;
function iniciarRotina() {
    var iframe = document.getElementById("link-iframe");
    iframe.src = links[indice];
    indice = (indice + 1) % links.length;
}
function comecarRotina() {
    iniciarRotina();
    intervalo = setInterval(iniciarRotina, 18000);
}
function pararRotina() {
    clearInterval(intervalo);
}
