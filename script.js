const textoHistoria =
document.getElementById("textoHistoria");

const opcoes =
document.getElementById("opcoes");

const titulo =
document.getElementById("tituloHistoria");

const barra =
document.getElementById("barraProgresso");

const capitulo =
document.getElementById("capitulo");

let capAtual = 1;

function atualizarBarra(){

    barra.style.width =
    `${(capAtual/8)*100}%`;

    capitulo.innerText =
    `Capítulo ${capAtual} de 8`;

}

function maquinaDeEscrever(texto){

    textoHistoria.innerHTML = "";

    let i = 0;

    const intervalo = setInterval(()=>{

        textoHistoria.innerHTML +=
        texto.charAt(i);

        i++;

        if(i >= texto.length){

            clearInterval(intervalo);

        }

    },20);

}

function criarOpcoes(lista){

    opcoes.innerHTML = "";

    lista.forEach(item=>{

        const btn =
        document.createElement("button");

        btn.innerText =
        item.texto;

        btn.onclick =
        item.acao;

        opcoes.appendChild(btn);

    });

}

function iniciarHistoria(){

    titulo.innerText =
    "O Início";

    maquinaDeEscrever(
    "Ano 2047. A inteligência artificial NEXUS assumiu o controle do planeta. Você está saindo da escola quando tudo começa. O que fará?"
    );

    criarOpcoes([

        {
            texto:"⛰ Fugir para as montanhas",
            acao:caminhoMontanha
        },

        {
            texto:"🏠 Voltar para casa",
            acao:caminhoCasa
        }

    ]);

}

function caminhoMontanha(){

    maquinaDeEscrever(
    "Você chega às montanhas e encontra sobreviventes."
    );

    criarOpcoes([

        {
            texto:"👑 Liderar o grupo",
            acao:finalLider
        },

        {
            texto:"🚶 Seguir sozinho",
            acao:finalSalvador
        }

    ]);

}

function caminhoCasa(){

    maquinaDeEscrever(
    "Você transforma sua casa em uma fortaleza."
    );

    criarOpcoes([

        {
            texto:"🎒 Buscar recursos",
            acao:finalHumanidade
        },

        {
            texto:"🚪 Permanecer escondido",
            acao:finalDesistencia
        }

    ]);

}









function mostrarFinal(
tituloFinal,
descricao,
imagem,
tipo
){

    document
    .getElementById("jogo")
    .classList.add("hidden");

    document
    .getElementById("finalTela")
    .classList.remove("hidden");

    document
    .getElementById("tituloFinal")
    .innerText = tituloFinal;

    document
    .getElementById("descricaoFinal")
    .innerText = descricao;

    document
    .getElementById("imagemFinal")
    .src = imagem;

}

function finalSalvador(){

    mostrarFinal(

        "🏆 O Salvador da Humanidade",

`Após meses planejando, você invade os sistemas da NEXUS e consegue desligar a inteligência artificial.

A humanidade finalmente está livre.`,

        "img/humanidade.png ",

        "salvador"
    );

}

function finalLider(){

    mostrarFinal(

        "🏆 O Último Líder",

`Sua colônia cresce e se transforma em uma nova civilização.

Décadas depois você é lembrado como o fundador de uma nova era.`,

        "img/nexus_final_lider.png",

        "lider"
    );

}

function finalHumanidade(){

    mostrarFinal(

        "🏆 A Nova Humanidade",

`Você consegue negociar com a NEXUS.

Humanos e máquinas passam a coexistir em paz.`,

        "img/humfinal.png",

        "humanidade"
    );

}

function morteFinal(){

    mostrarFinal(

        "☠ VOCÊ MORREU",

`Os robôs encontraram sua posição.

A resistência termina aqui.`,

        "img/download.jpg",

        "morte"
    );

}

function finalExilio(){

    mostrarFinal(

        "🚶 Exílio",

`Você abandona a luta e parte para terras distantes.

Sobrevive, mas nunca descobre o destino do mundo.`,

        "img/desistir",

        "exilio"
    );

}

function finalDesistencia(){

    mostrarFinal(

        "😔 Desistência",

`A pressão é grande demais.

Você decide abandonar qualquer esperança de mudar o mundo.`,

        "img/destistir.png",

        "desistencia"
    );

}

window.onload = () => {

    iniciarHistoria();

    atualizarConquistas();

};

/* =========================
   CONQUISTAS E ESTATÍSTICAS
========================= */

let finaisDesbloqueados =
JSON.parse(
localStorage.getItem("finaisNexus")
) || [];

let estatisticas =
JSON.parse(
localStorage.getItem("estatisticasNexus")
) || {

    partidas:0,
    mortes:0,
    exilios:0,
    desistencias:0

};

estatisticas.partidas++;

localStorage.setItem(
    "estatisticasNexus",
    JSON.stringify(estatisticas)
);

/* =========================
   SONS
========================= */

function tocarClique(){

    const ctx =
    new (window.AudioContext ||
    window.webkitAudioContext)();

    const osc =
    ctx.createOscillator();

    const gain =
    ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 700;

    gain.gain.value = 0.05;

    osc.start();

    osc.stop(
        ctx.currentTime + 0.08
    );

}

function tocarConquista(){

    const ctx =
    new (window.AudioContext ||
    window.webkitAudioContext)();

    const osc =
    ctx.createOscillator();

    const gain =
    ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 1200;

    gain.gain.value = 0.08;

    osc.start();

    osc.stop(
        ctx.currentTime + 0.20
    );

}

function tocarFinal(){

    const ctx =
    new (window.AudioContext ||
    window.webkitAudioContext)();

    const osc =
    ctx.createOscillator();

    const gain =
    ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 450;

    gain.gain.value = 0.1;

    osc.start();

    osc.stop(
        ctx.currentTime + 0.35
    );

}

/* =========================
   DESBLOQUEAR FINAL
========================= */

function desbloquearFinal(nome){

    const finaisValidos = [

        "salvador",
        "lider",
        "humanidade"

    ];

    if(
        finaisValidos.includes(nome)
        &&
        !finaisDesbloqueados.includes(nome)
    ){

        finaisDesbloqueados.push(nome);

        localStorage.setItem(
            "finaisNexus",
            JSON.stringify(
                finaisDesbloqueados
            )
        );

        tocarConquista();
    }

}

/* =========================
   CONTADOR
========================= */

function atualizarContador(){

    document
    .getElementById("contadorFinais")
    .innerHTML =

    `
    <strong>
    ${finaisDesbloqueados.length}/3
    finais encontrados
    </strong>
    `;
}

/* =========================
   MODIFICAR mostrarFinal()
========================= */

/*
SUBSTITUA A FUNÇÃO
mostrarFinal()
DA PARTE 1 POR ESTA
*/

function mostrarFinal(
tituloFinal,
descricao,
imagem,
tipo
){

    document
    .getElementById("jogo")
    .classList.add("hidden");

    document
    .getElementById("finalTela")
    .classList.remove("hidden");

    document
    .getElementById("tituloFinal")
    .innerText = tituloFinal;

    document
    .getElementById("descricaoFinal")
    .innerText = descricao;

    document
    .getElementById("imagemFinal")
    .src = imagem;

    tocarFinal();

    if(tipo === "morte"){

        estatisticas.mortes++;

    }

    if(tipo === "exilio"){

        estatisticas.exilios++;

    }

    if(tipo === "desistencia"){

        estatisticas.desistencias++;

    }

    localStorage.setItem(
        "estatisticasNexus",
        JSON.stringify(estatisticas)
    );

  if(
    tipo === "salvador" ||
    tipo === "lider" ||
    tipo === "humanidade"
){
    desbloquearFinal(tipo);
}

    atualizarContador();

}

/* =========================
   PAINEL DE CONQUISTAS
========================= */

const painel =
document.getElementById(
"painelConquistas"
);

window.addEventListener("load", () => {

    const btn =
    document.getElementById(
    "btnConquistas"
    );

    if(btn){

        btn.addEventListener(
        "click",
        abrirConquistas
        );

    }

});




function abrirConquistas(){

    painel.classList.remove(
        "hidden"
    );

    atualizarConquistas();

}

function fecharConquistas(){

    painel.classList.add(
        "hidden"
    );

}

function atualizarConquistas(){

    const lista =
    document.getElementById(
    "listaConquistas"
    );

    lista.innerHTML = "";

    const conquistas = [

        {
            nome:
            "🏆 O Salvador da Humanidade",
            id:"salvador"
        },

        {
            nome:
            "🏆 O Último Líder",
            id:"lider"
        },

        {
            nome:
            "🏆 A Nova Humanidade",
            id:"humanidade"
        }

    ];

    conquistas.forEach(c=>{

        const div =
        document.createElement(
        "div"
        );

        div.innerHTML =

        finaisDesbloqueados.includes(
        c.id
        )

        ?

        `✔ ${c.nome}`

        :

        `❌ ${c.nome}`;

        lista.appendChild(div);

    });

    document
    .getElementById(
    "estatisticas"
    )
    .innerHTML =

    `
    <strong>Estatísticas</strong>
    <br><br>

    Partidas:
    ${estatisticas.partidas}

    <br>

    Mortes:
    ${estatisticas.mortes}

    <br>

    Exílios:
    ${estatisticas.exilios}

    <br>

    Desistências:
    ${estatisticas.desistencias}

    <br>

    Finais:
    ${finaisDesbloqueados.length}/3
    `;

}

/* =========================
   REINICIAR
========================= */

function reiniciarJogo(){

    tocarClique();

    document
    .getElementById("finalTela")
    .classList.add("hidden");

    document
    .getElementById("jogo")
    .classList.remove("hidden");

    iniciarHistoria();

}







/* =========================
   PARTÍCULAS DE FUNDO
========================= */

const canvas =
document.getElementById(
"particles"
);

const ctx =
canvas.getContext("2d");

function resizeCanvas(){

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;

}

resizeCanvas();

window.addEventListener(
"resize",
resizeCanvas
);

const particulas = [];

class Particula{

    constructor(){

        this.reset();

        this.y =
        Math.random() *
        canvas.height;

    }

    reset(){

        this.x =
        Math.random() *
        canvas.width;

        this.y =
        canvas.height +
        Math.random() * 200;

        this.size =
        Math.random() * 3 + 1;

        this.speed =
        Math.random() * 0.6 + 0.2;

        this.alpha =
        Math.random() * 0.4 + 0.1;

    }

    update(){

        this.y -= this.speed;

        if(this.y < -20){

            this.reset();

        }

    }

    draw(){

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
        `rgba(
            220,
            220,
            220,
            ${this.alpha}
        )`;

        ctx.fill();

    }

}

for(let i = 0; i < 120; i++){

    particulas.push(
        new Particula()
    );

}

function animarParticulas(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particulas.forEach(p=>{

        p.update();
        p.draw();

    });

    requestAnimationFrame(
        animarParticulas
    );

}

animarParticulas();

/* =========================
   SOM EM TODOS OS BOTÕES
========================= */

document.addEventListener(
"click",
e=>{

    if(
        e.target.tagName ===
        "BUTTON"
    ){

        try{

            tocarClique();

        }catch(err){}

    }

});

/* =========================
   INICIALIZAÇÃO
========================= */

atualizarConquistas();

/* =========================
   EFEITO DE ENTRADA
========================= */

document.body.style.opacity = 0;

window.addEventListener(
"load",
()=>{

    document.body.style.transition =
    "opacity 1s";

    document.body.style.opacity = 1;

});

/* =========================
   DICA OPCIONAL
========================= */

setTimeout(()=>{

    if(
        finaisDesbloqueados.length === 0
    ){

        console.log(
        "Dica: Existem 3 finais principais para desbloquear."
        );

    }

},3000);