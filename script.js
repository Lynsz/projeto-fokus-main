// Seleciona o elemento <html>
const html = document.querySelector('html');

// Seleciona os botões de foco, descanso curto e descanso longo
const focoBt = document.querySelector('.app__card-button.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button.app__card-button--longo');

// Seleciona o banner de imagem e o título da aplicação
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

// Seleciona todos os botões com a classe 'app__card-button'
const botoes = document.querySelectorAll('.app__card-button');

// Seleciona o botão de iniciar/pausar
const startPauseBt = document.querySelector('#start-pause');

// Seleciona o input para alternar música
const musicaFocoInput = document.querySelector('#alternar-musica');

// Seleciona o span dentro do botão de iniciar/pausar
const iniciarOuPausarBt = document.querySelector('#start-pause span');

// Seleciona o ícone de pausa
const iconPausar = document.querySelector('.app__card-primary-butto-icon');

// Cria objetos de áudio para músicas e efeitos sonoros
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const beepSom = new Audio('/sons/beep.mp3');
const playSom = new Audio('/sons/play.wav');
const pauseSom = new Audio('/sons/pause.mp3');

// Seleciona o elemento onde o tempo será mostrado
const tempoNaTela = document.querySelector('#timer');

// Define que a música deve tocar em loop
musica.loop = true;

// Inicializa o tempo decorrido em segundos (25 minutos)
let tempoDecorridoEmSegundos = 1500;

// Inicializa o ID do intervalo como nulo
let intervaloId = null;

// Adiciona um evento ao input de alternar música para tocar ou pausar a música
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

// Adiciona um evento ao botão de foco para iniciar o timer de foco
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500; // 25 minutos
    alterarContexto('foco');
    focoBt.classList.add('active');
});

// Adiciona um evento ao botão de descanso curto para iniciar o timer de descanso curto
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300; // 5 minutos
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

// Adiciona um evento ao botão de descanso longo para iniciar o timer de descanso longo
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900; // 15 minutos
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

// Função para alterar o contexto da aplicação (foco, descanso curto, descanso longo)
function alterarContexto(contexto) {
    mostrarTempo(); // Atualiza a exibição do tempo
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
                Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `
                Hora de voltar à superfície. <strong class="app__title-strong"> Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
}

// Função de contagem regressiva do timer
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        beepSom.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1; // Decrementa o tempo
    mostrarTempo(); // Atualiza a exibição do tempo
};

// Adiciona um evento ao botão de iniciar/pausar para iniciar ou pausar o timer
startPauseBt.addEventListener('click', iniciarOuPausar);

// Função para iniciar ou pausar o timer
function iniciarOuPausar() {
    if (intervaloId) {
        pauseSom.play();
        zerar();
        return;
    }
    playSom.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    iconPausar.setAttribute('src', `/imagens/pause.png`);
}

// Função para zerar o timer
function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    iconPausar.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null;
}

// Função para mostrar o tempo formatado na tela
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

// Chama a função mostrarTempo ao carregar a página para exibir o tempo inicial
mostrarTempo();
