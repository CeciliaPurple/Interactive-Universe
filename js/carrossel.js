document.addEventListener('DOMContentLoaded', function() {
    const planetas = [
        {
            nome: "Mercúrio",
            imagem: "img/mercurio.png",
            descricao: "Mercúrio é pequeno, muito quente durante o dia e extremamente frio à noite,devido à falta de atmosfera.",
            link: "mercurio.html"
        },
        {
            nome: "Vênus",
            imagem: "img/venus.png",
            descricao: "Vênus é o segundo planeta do Sistema Solar,perto da Terra, mas com condições muito diferentes.",
            link: "venus.html"
        },
        {
            nome: "Terra",
            imagem: "img/terra.png",
            descricao: "O planeta Terra é o terceiro planeta do Sistema Solar e o único conhecido até agora que possui vida.",
            link: "terra.html"
        },
        {
            nome: "Marte",
            imagem: "img/marte.png",
            descricao: "Marte é o quarto planeta do Sistema Solar. Conhecido como o 'planeta vermelho' devido à sua cor,causada pelo óxido de ferro.",
            link: "marte.html"
        },
        {
            nome: "Júpiter",
            imagem: "img/jupiter.png",
            descricao: "Júpiter é o maior planeta do Sistema Solar. Ele é um gigante gasoso,composto principalmente de hidrogênio e hélio.",
            link: "jupiter.html"
        },
        {
            nome: "Saturno",
            imagem: "img/saturno.png",
            descricao: "Saturno é o sexto planeta a partir do Sol e o segundo maior do Sistema Solar, atrás apenas de Júpiter.",
            link: "saturno.html"
        },
        {
            nome: "Urano",
            imagem: "img/urano.png",
            descricao: "Urano é o sétimo planeta a contar do Sol, um gigante gasoso azul-esverdeado, e o terceiro maior do nosso sistema solar.",
            link: "urano.html"
        },
        {
            nome: "Netuno",
            imagem: "img/netuno.png",
            descricao: "Netuno é o oitavo planeta do Sistema Solar,o mais distante do Sol e é um gigante gasoso devido à presença de metano.",
            link: "netuno.html"
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

        const linkPlaneta = caixa.querySelector('a');
        if (linkPlaneta) {
            linkPlaneta.href = planeta.link;
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
