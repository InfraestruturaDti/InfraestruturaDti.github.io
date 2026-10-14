// [caminho, tempo em segundos]
// Atenção: o GitHub Pages diferencia maiúsculas/minúsculas no nome do arquivo.
const IMAGENS = [
	['imgs/infra.gif', 30],
	['imgs/Facilities.gif', 30],
	['imgs/setembro.png', 30],
	['imgs/BPPCerveja.gif', 25],
	['imgs/BPFone.gif', 25],
	['imgs/BPFuncionamento.gif', 25],
	['imgs/BPLanche.gif', 25],
];

// Imagens exibidas a partir das 18h (deixe vazio para usar sempre IMAGENS)
const IMAGENS_DPS_18 = [];

// [url, tempo em segundos] — exibidos depois das imagens
const LINKS = [];

const estado = {
	indice: -1, // posição atual na sequência (imagens + links)
	temporizador: null,
	intervaloBarra: null,
};

function eHorarioDepoisDas18h() {
	return new Date().getHours() >= 18;
}

function imagensAtuais() {
	return eHorarioDepoisDas18h() && IMAGENS_DPS_18.length > 0
		? IMAGENS_DPS_18
		: IMAGENS;
}

// Sequência completa: imagens seguidas dos links válidos
function sequencia() {
	const imagens = imagensAtuais().map(([src, tempo]) => ({ tipo: 'imagem', src, tempo }));
	const links = LINKS
		.filter((link) => link && link[0])
		.map(([src, tempo]) => ({ tipo: 'link', src, tempo }));
	return imagens.concat(links);
}

function exibir(indice) {
	const itens = sequencia();
	if (itens.length === 0) return;

	clearTimeout(estado.temporizador);
	estado.indice = ((indice % itens.length) + itens.length) % itens.length;
	const item = itens[estado.indice];

	const imagem = document.getElementById('minha-imagem');
	const iframe = document.getElementById('link-iframe');

	if (item.tipo === 'imagem') {
		imagem.src = item.src;
		imagem.style.display = 'block';
		iframe.style.display = 'none';
		iframe.src = 'about:blank';
	} else {
		iframe.src = item.src;
		iframe.style.display = 'block';
		imagem.style.display = 'none';
	}

	const tempo = (Number(item.tempo) || 30) * 1000;
	barraProgresso(itens.length, estado.indice, tempo);
	estado.temporizador = setTimeout(ExibirProximoConteudo, tempo);
}

function ExibirProximoConteudo() {
	exibir(estado.indice + 1);
}

function barraProgresso(total, indiceAtual, tempo) {
	const container = document.getElementById('progressBarContainer');
	container.innerHTML = '';
	clearInterval(estado.intervaloBarra);

	let progressoAtual = null;
	for (let i = 0; i < total; i++) {
		const barra = document.createElement('div');
		barra.className = 'progressBar';
		const progresso = document.createElement('div');
		progresso.className = 'progress';
		progresso.style.width = i < indiceAtual ? '100%' : '0%';
		if (i === indiceAtual) progressoAtual = progresso;
		barra.appendChild(progresso);
		container.appendChild(barra);
	}

	let largura = 0;
	estado.intervaloBarra = setInterval(() => {
		largura++;
		progressoAtual.style.width = largura + '%';
		if (largura >= 100) clearInterval(estado.intervaloBarra);
	}, tempo / 100);
}

function inicializarCliqueTela() {
	// Clique em qualquer lugar da tela avança para o próximo conteúdo
	document.addEventListener('click', function (event) {
		if (!event.target.closest('#paginacao-imagens')) {
			ExibirProximoConteudo();
		}
	});
}

window.onload = function () {
	inicializarCliqueTela();
	exibir(0);
};
