/*
Script para imagens.
Utilize apenas imagens locais neste vetor, não links externos, não há suporte para outros links
*/

var imagens = [
    "imgs/kitVideoConferencia.png",
    "imgs/Keepers.png",
    "imgs/gifcanva2.gif",
    "imgs/CuidadoPrincipio.png",
    "imgs/agilistas.gif",
    "imgs/Orgulho.png"


]; // array com as imagens
var tempo = 23000; // tempo em milissegundos para trocar as imagens
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
