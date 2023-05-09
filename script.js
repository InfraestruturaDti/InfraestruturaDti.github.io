var imagens = [
    "imgs/testepresencial.png",
    "imgs/FormsFeedback.gif", 
    "imgs/Keepers.png", 
    "imgs/vemAi.gif",
]; // array com as imagens
var tempo = 18000; // tempo em milissegundos para trocar as imagens
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