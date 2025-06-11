

const IMAGENS = [
	'imgs/Facilities.gif',
	'imgs/Infra.gif',
	'imgs/BPCerveja.gif',
	'imgs/BPFone.gif',
	'imgs/BPFuncionamento.gif',
	'imgs/BPLanche.gif',

];

const IMAGENS_DPS_18 = [];

const LINKS = ['https://dti.ag/GestaoaVista'];

const TEMPO = {
	imagens: 30000,
	links: 45000,
};

const estado = {
	indiceImagens: 0,
	indiceImagensDps18: 0,
	indiceLinks: 0,
	temporizador: null,
};
function atualizarExibicao(indice = null) {
	const isDepoisDas18 = eHorarioDepoisDas18h() && IMAGENS_DPS_18.length > 0;
	const imagensAtual = isDepoisDas18 ? IMAGENS_DPS_18 : IMAGENS;
	let indiceAtual = isDepoisDas18
		? estado.indiceImagensDps18
		: estado.indiceImagens;

	if (indice !== null) {
		indiceAtual = indice;
	} else if (!isDepoisDas18) {
		indiceAtual = (indiceAtual + 1) % imagensAtual.length;
	}

	document.getElementById('minha-imagem').src = imagensAtual[indiceAtual];
	document.getElementById('minha-imagem').style.display = 'block';
	document.getElementById('link-iframe').style.display = 'none';

	atualizarBotoesPaginacao(indiceAtual);

	if (isDepoisDas18) {
		estado.indiceImagensDps18 = indiceAtual;
	} else {
		estado.indiceImagens = indiceAtual;
	}

	return indiceAtual;
}

function atualizarBotoesPaginacao(indiceAtivo) {
	document
		.querySelectorAll('#paginacao-imagens li button')
		.forEach((btn, idx) => {
			btn.classList.toggle('ativo', idx === indiceAtivo);
		});
}

// function mostrarImagem(indice = null) {
// 	barraProgresso();
// 	clearTimeout(estado.temporizador);
// 	atualizarExibicao(indice);
// 	estado.temporizador = setTimeout(() => mostrarImagem(), TEMPO.imagens);
// }

function mostrarLink() {
	barraProgresso();
	clearTimeout(estado.temporizador);
	document.getElementById('link-iframe').style.display = 'block';
	document.getElementById('minha-imagem').style.display = 'none';
	document.getElementById('link-iframe').src = LINKS[estado.indiceLinks];
	estado.indiceLinks = (estado.indiceLinks + 1) % LINKS.length;
	estado.temporizador = setTimeout(mostrarImagem, TEMPO.links);
}

function inicializarPaginacao() {
	const estruturaPaginacao = IMAGENS.map(
		(imagem, index) =>
			`<li><button id="${imagem}" data-index="${index}"></button></li>`
	).join('');

	document.getElementById('paginacao-imagens').innerHTML = estruturaPaginacao;

	IMAGENS.forEach((imagem, index) => {
		document
			.getElementById(imagem)
			.addEventListener('click', () => mostrarImagem(index));
	});
}

function eHorarioDepoisDas18h() {
	const horaAtual = new Date().getHours();
	return horaAtual >= 7;
}

window.onload = function () {
	inicializarPaginacao();
	mostrarImagem();
};

function barraProgresso(indiceImagem) {
    var progressBarContainer = document.getElementById('progressBarContainer');
    progressBarContainer.innerHTML = ''; // Limpa barras de progresso antigas

    var total_pages = eHorarioDepoisDas18h() && IMAGENS_DPS_18.length > 0 ? IMAGENS_DPS_18.length : IMAGENS.length;
    var time_to_change = TEMPO.imagens;

    var id; // Definindo o id do setInterval fora do loop

    for(var i = 0; i < total_pages; i++) {
        var progressBar = document.createElement('div');
        progressBar.className = 'progressBar';
        var progress = document.createElement('div');
        progress.className = 'progress';
        if(i < indiceImagem) {
            progress.style.width = '100%'; // Se a imagem já foi mostrada, preenche a barra de progresso
        } else if(i === indiceImagem) {
            progress.style.width = '0%'; // Inicializa a barra de progresso da imagem atual com 0%
            id = setInterval(frame, (time_to_change / 100), progress); // Chama setInterval apenas para a barra de progresso da imagem atual
        }
        progressBar.appendChild(progress);
        progressBarContainer.appendChild(progressBar);
    }

    function frame(progress) {
        var width = progress.style.width.replace('%', '') || 0;
        if(width >= 100) {
            clearInterval(id);
        } else {
            width++; 
            progress.style.width = width + '%'; 
        }
    }
}

function mostrarImagem(indice = null) {
    clearTimeout(estado.temporizador);
    var indiceAtual = atualizarExibicao(indice);
    barraProgresso(indiceAtual); // Atualiza a barra de progresso quando uma nova imagem é mostrada
    estado.temporizador = setTimeout(() => mostrarImagem(), TEMPO.imagens);
} 	
