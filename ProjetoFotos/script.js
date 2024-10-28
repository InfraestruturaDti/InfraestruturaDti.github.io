import { IMAGENS } from './Imagens.js';
import { BORDAS } from './Bordas.js';

let imagensDisponiveis = [...IMAGENS];
let imagensExibidas = new Set();

document.addEventListener('DOMContentLoaded', () => {
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
        const randomIndex = Math.floor(Math.random() * imagensDisponiveis.length);
        const imgElement = document.createElement('img');
        const imageName = imagensDisponiveis[randomIndex];
        
        imgElement.src = imageName;
        imgElement.alt = imageName;

        const triboName = imageName.replace('Fotos/', '').split('-')[0]; // Extrai o nome da tribo
        const bordaName = BORDAS[triboName] || BORDAS['default']; // Obtém a borda correspondente ou a padrão

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

        const randomGridIndex = Math.floor(Math.random() * gridItems.length);
        const randomImageIndex = Math.floor(Math.random() * imagensDisponiveis.length);

        const selectedItem = gridItems[randomGridIndex];
        const selectedImg = selectedItem.querySelector('img:not(.borda)');
        const newImage = imagensDisponiveis[randomImageIndex];

        const triboName = newImage.split('-')[0];
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