import { IMAGENS } from './Imagens.js';


let imagensDisponiveis = [...IMAGENS];
let imagensExibidas = new Set();

document.addEventListener('DOMContentLoaded', () => {
    const gridItems = document.querySelectorAll('.grid-item');
    
    // Inicialmente preenche a grade com imagens aleatórias
    gridItems.forEach(item => {
        const randomIndex = Math.floor(Math.random() * imagensDisponiveis.length);
        const imgElement = document.createElement('img');
        imgElement.src = imagensDisponiveis[randomIndex];
        imgElement.alt = `Imagem ${randomIndex + 1}`;
        item.appendChild(imgElement);

        imagensExibidas.add(imagensDisponiveis[randomIndex]);
        imagensDisponiveis.splice(randomIndex, 1);
    });

    setInterval(() => {
        if (imagensDisponiveis.length === 0) {
            imagensDisponiveis = [...imagensExibidas];
            imagensExibidas.clear();
        }

        const randomGridIndex = Math.floor(Math.random() * gridItems.length);
        const randomImageIndex = Math.floor(Math.random() * imagensDisponiveis.length);

        const selectedItem = gridItems[randomGridIndex];
        const selectedImg = selectedItem.querySelector('img');
        const newImage = imagensDisponiveis[randomImageIndex];

        // Adiciona a classe fade-white
        selectedItem.classList.add('fade-white');

        // Após a transição, troca a imagem e remove as classes
        setTimeout(() => {
            selectedImg.src = newImage;
            selectedItem.classList.remove('fade-white');
        }, 500); // Tempo deve coincidir com a duração da transição

        imagensExibidas.add(newImage);
        imagensDisponiveis.splice(randomImageIndex, 1);
    }, 500);
});