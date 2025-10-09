


const IMAGENS = [
	['imgs/Facilities.gif', 30],
	['imgs/Infra.gif', 10	],
	['imgs/BPCerveja.gif', 30],
	['imgs/BPFone.gif', 25],
	['imgs/BPFuncionamento.gif', 25],
	['imgs/BPLanche.gif', 25],

];

const IMAGENS_DPS_18 = [
	
];

const LINKS = [
	[]
];

// const TEMPO = {
// 	imagens: 35000,
// 	links: 45000,
// };

const estado = {
	indiceImagens: 0,
	indiceImagensDps18: 0,
	indiceLinks: 0,
	temporizador: null,
	cicloAtual: 'imagens', // 'imagens' ou 'links'
	contadorCiclos: 0,
	indiceGlobal: 0 // Novo: índice global para controlar todas as barras
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

	// Acessar o caminho da imagem (primeiro elemento do array)
	document.getElementById('minha-imagem').src = imagensAtual[indiceAtual][0];
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

function mostrarLink() {
	// Calcular o índice global atual (imagens + links já exibidos)
	const isDepoisDas18 = eHorarioDepoisDas18h() && IMAGENS_DPS_18.length > 0;
	const imagensAtual = isDepoisDas18 ? IMAGENS_DPS_18 : IMAGENS;
	const indiceGlobalAtual = imagensAtual.length + estado.indiceLinks;
	
	barraProgresso(indiceGlobalAtual);
	clearTimeout(estado.temporizador);
	document.getElementById('link-iframe').style.display = 'block';
	document.getElementById('minha-imagem').style.display = 'none';
	// Acessar a URL do link (primeiro elemento do array)
	document.getElementById('link-iframe').src = LINKS[estado.indiceLinks][0];
	
	// Obter o tempo específico deste link (segundo elemento do array)
	const tempoLink = LINKS[estado.indiceLinks][1] * 1000; // Converter para milissegundos
	
		// Após mostrar todos os links, voltar para imagens
		if (estado.indiceLinks === LINKS.length - 1) {
			estado.cicloAtual = 'imagens';
			estado.indiceLinks = 0; // Reset do índice de links
			estado.temporizador = setTimeout(() => mostrarImagem(), tempoLink);
		} else {
			estado.indiceLinks = (estado.indiceLinks + 1) % LINKS.length;
			estado.temporizador = setTimeout(() => mostrarLink(), tempoLink);
		}
}



function eHorarioDepoisDas18h() {
	const horaAtual = new Date().getHours();
	return horaAtual >= 7;
}

// function proximoIndice() {
// 	clearTimeout(estado.temporizador);
	
// 	if (estado.cicloAtual === 'imagens') {
// 		mostrarImagem();
// 	} else {
// 		// Se está nos links, voltar para imagens
// 		estado.cicloAtual = 'imagens';
// 		estado.indiceLinks = 0;
// 		// Resetar o índice de imagens para começar do início
// 		estado.indiceImagens = 0;
// 		estado.indiceImagensDps18 = 0;
// 		mostrarImagem();
// 	}
// }

function inicializarCliqueTela() {
	// Adicionar listener de clique em toda a tela
	document.addEventListener('click', function(event) {
		// Evitar conflito com os botões de paginação
		if (!event.target.closest('#paginacao-imagens')) {
			ExibirProximoConteudo();
		}
	});
}

window.onload = function () {
	inicializarCliqueTela(); // Adicionar inicialização do clique
	mostrarImagem();
};

function barraProgresso(indiceAtual) {
    var progressBarContainer = document.getElementById('progressBarContainer');
    progressBarContainer.innerHTML = ''; // Limpa barras de progresso antigas

    // Calcular total de páginas: imagens + links
    const isDepoisDas18 = eHorarioDepoisDas18h() && IMAGENS_DPS_18.length > 0;
    const imagensAtual = isDepoisDas18 ? IMAGENS_DPS_18 : IMAGENS;
    var total_pages = imagensAtual.length + LINKS.length;
    
    // Determinar o tempo baseado no tipo de conteúdo atual
    var time_to_change;
    if (estado.cicloAtual === 'imagens') {
        time_to_change = imagensAtual[indiceAtual][1] * 1000; // Converter para milissegundos
    } else {
        time_to_change = LINKS[estado.indiceLinks][1] * 1000; // Converter para milissegundos
    }

    var id; // Definindo o id do setInterval fora do loop

    for(var i = 0; i < total_pages; i++) {
        var progressBar = document.createElement('div');
        progressBar.className = 'progressBar';
        var progress = document.createElement('div');
        progress.className = 'progress';
        
        if(i < indiceAtual) {
            progress.style.width = '100%'; // Se já foi mostrado, preenche a barra
        } else if(i === indiceAtual) {
            progress.style.width = '0%'; // Inicializa a barra atual com 0%
            id = setInterval(frame, (time_to_change / 100), progress);
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

function ExibirProximoConteudo() {
    if (estado.cicloAtual === 'imagens') {
        mostrarImagem();
    } else {
        mostrarLink();
    }
}

function mostrarImagem(indice = null) {
    clearTimeout(estado.temporizador);
    
    // Definir imagensAtual aqui também
    const isDepoisDas18 = eHorarioDepoisDas18h() && IMAGENS_DPS_18.length > 0;
    const imagensAtual = isDepoisDas18 ? IMAGENS_DPS_18 : IMAGENS;
    
    var indiceAtual = atualizarExibicao(indice);
    
    // Se foi chamado manualmente (clique), usar o índice fornecido
    if (indice !== null) {
        barraProgresso(indice);
    } else {
        barraProgresso(indiceAtual);
    }
    
    // Obter o tempo específico desta imagem (segundo elemento do array)
    const tempoImagem = imagensAtual[indiceAtual][1] * 1000; // Converter para milissegundos
    
    if (indiceAtual === imagensAtual.length - 1 && indice === null) {
        estado.cicloAtual = 'links';
        estado.indiceLinks = 0; // Reset do índice de links
        estado.temporizador = setTimeout(() => mostrarLink(), tempoImagem);
    } else {
        estado.temporizador = setTimeout(() => mostrarImagem(), tempoImagem);
    }
}
