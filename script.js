/*
Script para imagens.
Utilize apenas imagens locais neste vetor, não links externos, não há suporte para outros links
*/

var imagens = [

    "ImagesRubix/rubix1.png",
"ImagesRubix/rubix2.png",
"ImagesRubix/rubix3.png",
"ImagesRubix/rubix4.png",
"ImagesRubix/rubix5.png",
"ImagesRubix/rubix6.png",
"ImagesRubix/rubix7.png",
"ImagesRubix/rubix8.png",
"ImagesRubix/rubix9.png",
"ImagesRubix/rubix10.png",
"ImagesRubix/rubix11.png",
"ImagesRubix/rubix12.png",
"ImagesRubix/rubix13.png",
"ImagesRubix/rubix14.png",
"ImagesRubix/rubix15.png",
"ImagesRubix/rubix16.png",
"ImagesRubix/rubix17.png",
"ImagesRubix/rubix18.png",
"ImagesRubix/rubix19.png",
"ImagesRubix/rubix20.png",
"ImagesRubix/rubix21.png",
"ImagesRubix/rubix22.png",
"ImagesRubix/rubix23.png",
"ImagesRubix/rubix24.png",
"ImagesRubix/rubix25.png",
"ImagesRubix/rubix26.png",
"ImagesRubix/rubix27.png",
"ImagesRubix/rubix28.png",
"ImagesRubix/rubix29.png",
"ImagesRubix/rubix30.png",
"ImagesRubix/rubix31.png",
"ImagesRubix/rubix32.png",
"ImagesRubix/rubix33.png",
"ImagesRubix/rubix34.png",
"ImagesRubix/rubix35.png",
"ImagesRubix/rubix36.png",
"ImagesRubix/rubix37.png",
"ImagesRubix/rubix38.png",
"ImagesRubix/rubix39.png",
"ImagesRubix/rubix40.png",
"ImagesRubix/rubix41.png",
"ImagesRubix/rubix42.png",
"ImagesRubix/rubix43.png",
"ImagesRubix/rubix44.png",

    

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
