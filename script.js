/*
Script para imagens.
Utilize apenas imagens locais neste vetor, não links externos, não há suporte para outros links
*/

var imagens = [

"imgs/rackers/00.png",
"imgs/rackers/0.gif",
"imgs/rackers/28v.gif",
"imgs/rackers/26v.gif",
"imgs/rackers/01.png",
"imgs/rackers/02.png",
"imgs/rackers/03.jpg",
"imgs/rackers/29v.gif",
"imgs/rackers/25v.gif",
"imgs/rackers/04.jpg",
"imgs/rackers/05.jpg",
"imgs/rackers/27v.gif",
"imgs/rackers/06.jpg",
"imgs/rackers/07.jpg",
"imgs/rackers/08.png",
"imgs/rackers/10.png",
"imgs/rackers/11.png",
"imgs/rackers/12.png",
"imgs/rackers/13.png",
"imgs/rackers/14.png",
"imgs/rackers/15.png",
"imgs/rackers/16.png",
"imgs/rackers/17.png",
"imgs/rackers/18.png",
"imgs/rackers/19.png",
"imgs/rackers/20.png",
"imgs/rackers/21.png",
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
