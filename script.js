const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button.app__card-button--longo');
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iconPausar = document.querySelector('.app__card-primary-butto-icon')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const beepSom = new Audio('/sons/beep.mp3')
const playSom = new Audio('/sons/play.wav')
const pauseSom = new Audio('/sons/pause.mp3')

musica.loop = true

let tempoDecorridoEmSegundos = 5
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});

function alterarContexto(contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case "descanso-curto":
            titulo.innerHTML = `
                Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `
            break;

        case "descanso-longo":
            titulo.innerHTML = `
                Hora de voltar à superfície. <strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        // beepSom.play();
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    console.log('Temporizador:' + tempoDecorridoEmSegundos)
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        pauseSom.play();
        zerar()
        return
    }
    playSom.play(); 0
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iconPausar.setAttribute('src', `/imagens/pause.png`)

}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iconPausar.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null

}
