import { IMAGENS } from './Imagens.js';
import { BORDAS } from './Bordas.js';

let imagensDisponiveis = [...IMAGENS];
let imagensExibidas = new Set();
let posicoesDisponiveis = [];

document.addEventListener('DOMContentLoaded', () => {
    const gridItems = document.querySelectorAll('.grid-item');
    
    // Inicializa a lista de posições disponíveis
    posicoesDisponiveis = Array.from(Array(gridItems.length).keys());

    gridItems.forEach(item => {
        const randomIndex = Math.floor(Math.random() * imagensDisponiveis.length);
        const imgElement = document.createElement('img');
        const imageName = imagensDisponiveis[randomIndex];
        
        imgElement.src = imageName;
        imgElement.alt = imageName;

        const parts = imageName.replace('Fotos/', '').split('-');
        const triboName = parts.length > 0 ? parts[0] : 'default';
        const bordaName = BORDAS[triboName] || BORDAS['default'];

        const borderElement = document.createElement('img');
        borderElement.src = bordaName;
        borderElement.classList.add('borda');

        item.appendChild(imgElement);
        item.appendChild(borderElement);

        imagensExibidas.add(imagensDisponiveis[randomIndex]);
        imagensDisponiveis.splice(randomIndex, 1);
    });

    setInterval(() => {
        if (imagensDisponiveis.length === 0) {
            imagensDisponiveis = [...imagensExibidas];
            imagensExibidas.clear();
        }

        if (posicoesDisponiveis.length === 0) {
            posicoesDisponiveis = Array.from(Array(gridItems.length).keys());
        }

        const randomPosIndex = Math.floor(Math.random() * posicoesDisponiveis.length);
        const randomGridIndex = posicoesDisponiveis[randomPosIndex];
        posicoesDisponiveis.splice(randomPosIndex, 1); // Remove a posição usada

        const randomImageIndex = Math.floor(Math.random() * imagensDisponiveis.length);

        const selectedItem = gridItems[randomGridIndex];
        const selectedImg = selectedItem.querySelector('img:not(.borda)');
        const newImage = imagensDisponiveis[randomImageIndex];

        const parts = newImage.replace('Fotos/', '').split('-');
        const triboName = parts.length > 0 ? parts[0] : 'default';
        const bordaName = BORDAS[triboName] || BORDAS['default'];
        const selectedBorder = selectedItem.querySelector('.borda');

        selectedItem.classList.add('fade-white');

        setTimeout(() => {
            selectedImg.src = newImage;
            selectedBorder.src = bordaName;
            selectedItem.classList.remove('fade-white');
        }, 500);

        imagensExibidas.add(newImage);
        imagensDisponiveis.splice(randomImageIndex, 1);
    }, 500);
});