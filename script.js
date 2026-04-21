// variavel telas ininicio do código(
const menu = document.getElementById('Menu');
const jogo = document.getElementById('Jogo');
const Doar = document.getElementById('TelaDeDoar');
const TelaDeCelula = document.getElementById('TelaDeCelula');
const telaPerteu = document.getElementById('telaPerteu');

//ponto variavel
document.getElementById('pontucao').innerHTML = "Potuação:"
const pontoText = document.getElementById('ponto');
const recordeText = document.getElementById('recorde');
let ponto = 0;
let recorde = parseInt(localStorage.getItem("recorde")) || 0;
let loopPonto = null;
//play
const player = document.querySelector(".play");
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

//funçao da tela de perteu
function TelaDePerteu(){
    setTimeout(() => {
        removerTodosInimigos()
    },100);
    resetarJogo();
    if (loopPonto) {
        clearInterval(loopPonto);
    }
    if (nasceInimgo) {
        clearInterval(nasceInimgo);
    }
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
    vida = 100;
    atualizarBarra();
    surmirInimigoEPlay();
    menu.style.display = "none";
    jogo.style.display = "none";
    Doar.style.display = "none";
    TelaDeCelula.style.display = "none";
    telaPerteu.style.display = "block";
    recordeText.innerHTML = "Recorde: " + recorde;
}

//função pontos
function contarPonto() {
    // 👇 limpa qualquer intervalo anterior
    if (loopPonto) {
        clearInterval(loopPonto);
    }

    loopPonto = setInterval(() => {
        ponto++;
        pontoText.innerHTML = ponto;

        if (ponto > recorde) {
            recorde = ponto;
            localStorage.setItem("recorde", recorde);
            recordeText.innerHTML = "Recorde: " + recorde;
        }
        document.getElementById('pontucao').innerHTML = "Potuação:"+ponto
    }, 1000);
}

//inimigo
let nasceInimgo;
function aparecerInimigos() {
    nasceInimgo = setInterval(() => {
        const inimigo = document.createElement("div");
        inimigo.classList.add("inimigo");
        inimigo.vidaI = 5;

        let lado = Math.floor(Math.random() * 4);

        let inimigox, inimigoy;

        if (lado === 0) { // topo
            inimigox = Math.random() * window.innerWidth;
            inimigoy = -50;
        } else if (lado === 1) { // direita
            inimigox = window.innerWidth + 50;
            inimigoy = Math.random() * window.innerHeight;
        } else if (lado === 2) { // baixo
            inimigox = Math.random() * window.innerWidth;
            inimigoy = window.innerHeight + 50;
        } else { // esquerda
            inimigox = -50;
            inimigoy = Math.random() * window.innerHeight;
        }

        jogo.appendChild(inimigo);

        function mover() {
            if (!document.body.contains(inimigo)) return;
            let offsetX = (Math.random() - 0.5) * 50;
            let offsetY = (Math.random() - 0.5) * 50;
            let dx = (x + offsetX) - inimigox;
            let dy = (y + offsetY) - inimigoy;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist === 0) dist = 0.1;
            let dirX = dx / dist;
            let dirY = dy / dist;  

            inimigox += dirX * 2;
            inimigoy += dirY * 2;
            // colisão player
            let playerRect = player.getBoundingClientRect();
            let inimigoRect = inimigo.getBoundingClientRect();

            if (
                playerRect.left < inimigoRect.right &&
                playerRect.right > inimigoRect.left &&
                playerRect.top < inimigoRect.bottom &&
                playerRect.bottom > inimigoRect.top
            ) {
                vida -= 0.2;
               if (vida < 0) vida = 0;
               atualizarBarra();
               if (vida <= 0) {
                 TelaDePerteu();
                 return;
                }
            }
            inimigo.style.left = inimigox + "px";
            inimigo.style.top = inimigoy + "px";
            requestAnimationFrame(mover);
        }
        mover();
    }, 5000);
}
function removerTodosInimigos() {
    const inimigos = document.querySelectorAll(".inimigo");
    inimigos.forEach(inimigo => inimigo.remove());
}

// função quando o usuario olha o site com o celular
function telaDoDispositivo() {
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
}
telaDoDispositivo()
//fução para ir para a apoio
function irParaTelaDeDoar() {
    setTimeout(() => {
        removerTodosInimigos()
    }, 100);
    resetarJogo();

    if (loopPonto) {
        clearInterval(loopPonto);
    }
    if (nasceInimgo) {
        clearInterval(nasceInimgo); 
    }

    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
    vida = 100;
    removerTodosInimigos()
    atualizarBarra();
    surmirInimigoEPlay();
    menu.style.display = "none";
    jogo.style.display = "none";
    telaPerteu.style.display = "none";
    Doar.style.display = "block";
    recordeText.innerHTML = "Recorde: " + recorde;
}
//verificar tela
//funçao quando carregar site
function carregarSite() {
    setTimeout(() => {
        removerTodosInimigos()
    }, 100);
    resetarJogo();


    if (loopPonto) {
        clearInterval(loopPonto);
    }
    if (nasceInimgo) {
        clearInterval(nasceInimgo);
    }

    x = window.innerWidth / 2;
    y = window.innerHeight / 2;

    vida = 100;
    removerTodosInimigos()
    atualizarBarra();
    surmirInimigoEPlay();

    menu.style.display = "block";
    jogo.style.display = "none";
    telaPerteu.style.display = "none";
    TelaDeCelula.style.display = "none";
    Doar.style.display = "none";

    recordeText.innerHTML = "Recorde: " + recorde;
}
function comecarJogo() {
    setTimeout(() => {
        removerTodosInimigos()
    }, 100);
    resetarJogo();

    x = window.innerWidth / 2;
    y = window.innerHeight / 2;

    aparecerInimigoEPlay();
    aparecerInimigos()

    vida = 100;
    atualizarBarra();

    menu.style.display = "none";
    jogo.style.display = "block";
    telaPerteu.style.display = "none";
    TelaDeCelula.style.display = "none";
    Doar.style.display = "none";
    contarPonto(); 
}

// resetar
function resetarJogo() {
    ponto = 0;
    vida = 100;

    pontoText.innerHTML = ponto;
    atualizarBarra();
} 
//codigo de tiro e movimetação do play
const arma = document.querySelector(".arma");

// teclado
let keys = {};
let velocidade = 4;
document.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

// mouse
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// loop do jogo
function atualizar() {

    // movimento
    if (keys["w"] || keys["arrowup"]) y -= velocidade;
    if (keys["s"] || keys["arrowdown"]) y += velocidade;
    if (keys["a"] || keys["arrowleft"]) x -= velocidade;
    if (keys["d"] || keys["arrowright"]) x += velocidade;

    let largura = player.offsetWidth;
    let altura = player.offsetHeight;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > window.innerWidth - largura) x = window.innerWidth - largura;
    if (y > window.innerHeight - altura) y = window.innerHeight - altura;

    player.style.left = x + "px";
    player.style.top = y + "px";

    // rotação + posição da arma
    let dx = mouseX - x;
    let dy = mouseY - y;
    let angulo = Math.atan2(dy, dx);

    let distanciaArma = 50;

    let armaX = Math.cos(angulo) * distanciaArma;
    let armaY = Math.sin(angulo) * distanciaArma;

    // flip da arma
    let flip = Math.cos(angulo) < 0 ? -1 : 1;

    arma.style.transform = `
        translate(${armaX}px, ${armaY}px)
        rotate(${angulo}rad)
        scaleY(${flip})
    `;

    requestAnimationFrame(atualizar);
}
//vida
const span = document.querySelector(".span");
let vida = 100;
const barra = document.getElementById("vida");
function atualizarBarra() {
  barra.style.width = vida + "%";

  if (vida > 60) {
    barra.style.backgroundColor = "green";
  } else if (vida > 30) {
    barra.style.backgroundColor = "yellow";
  } else {
    barra.style.backgroundColor = "red";
  }
}

function surmirInimigoEPlay() {
    player.style.display = "none"
}

function aparecerInimigoEPlay() {
    player.style.display = "block"
    player.style.transform = "translate(-50%, -50%);"
    player.style.position= "absolute";
    player.style.top= "50%";
    player.style.left= "50%";
}
// controle de tiro
let podeAtirar = true;
let bala;
document.addEventListener("click", () => {
    if (!podeAtirar) return;

    podeAtirar = false;

    let bala = document.createElement("img");
    bala.src = "imagem/bala.png";
    bala.classList.add("bala");

    jogo.appendChild(bala);

    let angulo = Math.atan2(mouseY - y, mouseX - x);

    // ponta da arma
    let distancia = 70;

    let balaX = x + Math.cos(angulo) * distancia;
    let balaY = y + Math.sin(angulo) * distancia;

    bala.style.left = balaX + "px";
    bala.style.top = balaY + "px";

    let velocidadeBala = 10;

    function moverBala() {
        balaX += Math.cos(angulo) * velocidadeBala;
        balaY += Math.sin(angulo) * velocidadeBala;

        bala.style.left = balaX + "px";
        bala.style.top = balaY + "px";
        //tira vida do inimigo
        let inimigos = document.querySelectorAll(".inimigo");

        inimigos.forEach((inimigo) => {
            let inimigoRect = inimigo.getBoundingClientRect();
            let balaRect = bala.getBoundingClientRect();
            if (
                balaRect.left < inimigoRect.right &&
                balaRect.right > inimigoRect.left &&
                balaRect.top < inimigoRect.bottom &&
                balaRect.bottom > inimigoRect.top
            ) {
                inimigo.vidaI--;
                bala.remove();
                if (inimigo.vidaI <= 0) {
                    inimigo.remove();
                }

                 return; // 🔥 importante
            } 
    });
        // remover quando sair da tela
        if (
            balaX < 0 ||
            balaX > window.innerWidth ||
            balaY < 0 ||
            balaY > window.innerHeight
        ) {
            bala.remove();
            return;
        }

        requestAnimationFrame(moverBala);
    }

    moverBala();

    setTimeout(() => {
        podeAtirar = true;
    }, 1000);
});
document.addEventListener("DOMContentLoaded", () => {
    const tela = window.matchMedia("(min-width: 1024px)");

    function checar(e) {
        if (e.matches) {
            // PC
            carregarSite();
        } else {
            // CELULAR
            menu.style.display = "none";
            jogo.style.display = "none";
            telaPerteu.style.display = "none";
            Doar.style.display = "none";
            TelaDeCelula.style.display = "block";
        }
    }

    checar(tela);
    tela.addEventListener("change", checar);
});
atualizar();