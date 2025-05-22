document.addEventListener('DOMContentLoaded', function() {
    const planetas = [
        {
            nome: "Mercúrio",
            imagem: "img/mercurio.png",
            descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at perferendis obcaecati, earum porro."
        },
        {
            nome: "Vênus",
            imagem: "img/venus.png",
            descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at perferendis obcaecati, earum porro."
        },
        {
            nome: "Terra",
            imagem: "img/terra.png",
            descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at perferendis obcaecati, earum porro."
        },
        {
            nome: "Marte",
            imagem: "img/marte.png",
            descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at perferendis obcaecati, earum porro."
        },
        {
            nome: "Júpiter",
            imagem: "img/jupiter.png",
            descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at perferendis obcaecati, earum porro."
        },
        {
            nome: "Saturno",
            imagem: "img/saturno.png",
            descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at perferendis obcaecati, earum porro."
        },
        {
            nome: "Urano",
            imagem: "img/urano.png",
            descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at perferendis obcaecati, earum porro."
        },
        {
            nome: "Netuno",
            imagem: "img/netuno.png",
            descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at perferendis obcaecati, earum porro."
        }
    ];

    // Elementos do carrossel
    const caixas = document.querySelectorAll('.carrossel .caixa-P, .carrossel .caixa-M, .carrossel .caixa-G');
    const btnAnterior = document.querySelector('.seta-esq');
    const btnProximo = document.querySelector('.seta-dire');
    
    // Índice inicial para cada caixa
    let indicesCaixas = [0, 1, 2, 3, 4];
    
    // Função para atualizar o conteúdo de uma caixa
    function atualizarConteudoCaixa(caixa, indicePlaneta) {
        // Garantir que o índice esteja dentro dos limites do array
        const indiceSeguro = ((indicePlaneta % planetas.length) + planetas.length) % planetas.length;
        const planeta = planetas[indiceSeguro];
        
        // Atualizar o título (nome do planeta)
        const tituloPlaneta = caixa.querySelector('div:first-child p');
        if (tituloPlaneta) {
            tituloPlaneta.textContent = planeta.nome;
        }
        
        // Atualizar a imagem do planeta
        const imagemPlaneta = caixa.querySelector('img');
        if (imagemPlaneta) {
            imagemPlaneta.src = planeta.imagem;
            imagemPlaneta.alt = planeta.nome;
        }
        
        // Atualizar a descrição do planeta
        const descricaoPlaneta = caixa.querySelector('.meia-caixa-P p, .meia-caixa-M p, .meia-caixa-G p');
        if (descricaoPlaneta) {
            descricaoPlaneta.textContent = planeta.descricao;
        }
    }
    
    // Função para atualizar todas as caixas
    function atualizarTodasCaixas() {
        caixas.forEach((caixa, index) => {
            atualizarConteudoCaixa(caixa, indicesCaixas[index]);
        });
    }
    
    // Função para mover para o próximo conjunto de planetas
    function moverProximo() {
        indicesCaixas = indicesCaixas.map(indice => indice + 1);
        atualizarTodasCaixas();
    }
    
    // Função para mover para o conjunto anterior de planetas
    function moverAnterior() {
        indicesCaixas = indicesCaixas.map(indice => indice - 1);
        atualizarTodasCaixas();
    }
    
    // Adicionar eventos de clique aos botões
    btnAnterior.addEventListener('click', moverAnterior);
    btnProximo.addEventListener('click', moverProximo);
    
    // Inicializar o carrossel
    atualizarTodasCaixas();
});
