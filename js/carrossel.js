document.addEventListener('DOMContentLoaded', function() {
    // Array de planetas com traduções para nome e descrição
    const planetas = [
        {
            id: "mercury", // ID único para referência interna, se necessário
            nome: { pt: "Mercúrio", en: "Mercury" },
            imagem: "img/mercurio.png",
            descricao: { 
                pt: "Mercúrio é pequeno, muito quente durante o dia e extremamente frio à noite, devido à falta de atmosfera.", 
                en: "Mercury is small, very hot during the day and extremely cold at night, due to the lack of atmosphere." 
            },
            link: "mercurio.html"
        },
        {
            id: "venus",
            nome: { pt: "Vênus", en: "Venus" },
            imagem: "img/venus.png",
            descricao: { 
                pt: "Vênus é o segundo planeta do Sistema Solar, perto da Terra, mas com condições muito diferentes.", 
                en: "Venus is the second planet in the Solar System, close to Earth, but with very different conditions." 
            },
            link: "venus.html"
        },
        {
            id: "earth",
            nome: { pt: "Terra", en: "Earth" },
            imagem: "img/terra.png",
            descricao: { 
                pt: "O planeta Terra é o terceiro planeta do Sistema Solar e o único conhecido até agora que possui vida.", 
                en: "Planet Earth is the third planet in the Solar System and the only one known so far to have life." 
            },
            link: "terra.html"
        },
        {
            id: "mars",
            nome: { pt: "Marte", en: "Mars" },
            imagem: "img/marte.png",
            descricao: { 
                pt: "Marte é o quarto planeta do Sistema Solar. Conhecido como o 'planeta vermelho' devido à sua cor, causada pelo óxido de ferro.", 
                en: "Mars is the fourth planet in the Solar System. Known as the 'red planet' due to its color, caused by iron oxide." 
            },
            link: "marte.html"
        },
        {
            id: "jupiter",
            nome: { pt: "Júpiter", en: "Jupiter" },
            imagem: "img/jupiter.png",
            descricao: { 
                pt: "Júpiter é o maior planeta do Sistema Solar. Ele é um gigante gasoso, composto principalmente de hidrogênio e hélio.", 
                en: "Jupiter is the largest planet in the Solar System. It is a gas giant, composed mainly of hydrogen and helium." 
            },
            link: "jupiter.html"
        },
        {
            id: "saturn",
            nome: { pt: "Saturno", en: "Saturn" },
            imagem: "img/saturno.png",
            descricao: { 
                pt: "Saturno é o sexto planeta a partir do Sol e o segundo maior do Sistema Solar, atrás apenas de Júpiter.", 
                en: "Saturn is the sixth planet from the Sun and the second largest in the Solar System, behind only Jupiter." 
            },
            link: "saturno.html"
        },
        {
            id: "uranus",
            nome: { pt: "Urano", en: "Uranus" },
            imagem: "img/urano.png",
            descricao: { 
                pt: "Urano é o sétimo planeta a contar do Sol, um gigante gasoso azul-esverdeado, e o terceiro maior do nosso sistema solar.", 
                en: "Uranus is the seventh planet from the Sun, a blue-green gas giant, and the third largest in our solar system." 
            },
            link: "urano.html"
        },
        {
            id: "neptune",
            nome: { pt: "Netuno", en: "Neptune" },
            imagem: "img/netuno.png",
            descricao: { 
                pt: "Netuno é o oitavo planeta do Sistema Solar, o mais distante do Sol e é um gigante gasoso devido à presença de metano.", 
                en: "Neptune is the eighth planet in the Solar System, the furthest from the Sun and is a gas giant due to the presence of methane." 
            },
            link: "netuno.html"
        }
    ];

    // Elementos do carrossel
    const caixas = document.querySelectorAll('.carrossel .caixa-P, .carrossel .caixa-M, .carrossel .caixa-G');
    const btnAnterior = document.querySelector('.seta-esq');
    const btnProximo = document.querySelector('.seta-dire');
    
    // Índice inicial para cada caixa (representa o índice do planeta no array `planetas`)
    let indicesCaixas = [0, 1, 2, 3, 4]; // Mostra Mercúrio, Vênus, Terra, Marte, Júpiter inicialmente
    
    /**
     * Atualiza o conteúdo de uma caixa específica do carrossel.
     * @param {HTMLElement} caixa - O elemento da caixa a ser atualizado.
     * @param {number} indicePlaneta - O índice do planeta no array `planetas`.
     * @param {string} idioma - O idioma atual ('pt' ou 'en').
     */
    function atualizarConteudoCaixa(caixa, indicePlaneta, idioma) {
        // Garante que o índice do planeta seja cíclico e válido
        const indiceSeguro = ((indicePlaneta % planetas.length) + planetas.length) % planetas.length;
        const planeta = planetas[indiceSeguro];
        
        // Seleciona os elementos dentro da caixa
        const tituloPlanetaEl = caixa.querySelector('div:first-child p'); // Nome do planeta
        const imagemPlanetaEl = caixa.querySelector('img'); // Imagem do planeta
        // Descrição (seleciona qualquer parágrafo dentro das classes de meia-caixa)
        const descricaoPlanetaEl = caixa.querySelector('.meia-caixa-P p, .meia-caixa-M p, .meia-caixa-G p'); 
        const linkPlanetaEl = caixa.querySelector('a'); // Link (se houver, como na Terra)

        // Atualiza o nome do planeta com base no idioma
        if (tituloPlanetaEl && planeta.nome[idioma]) {
            tituloPlanetaEl.textContent = planeta.nome[idioma];
        }
        
        // Atualiza a imagem e o alt text (usa o nome no idioma atual para alt)
        if (imagemPlanetaEl) {
            imagemPlanetaEl.src = planeta.imagem;
            if (planeta.nome[idioma]) {
                imagemPlanetaEl.alt = planeta.nome[idioma]; // Alt text traduzido
            }
        }
        
        // Atualiza a descrição do planeta com base no idioma
        if (descricaoPlanetaEl && planeta.descricao[idioma]) {
            descricaoPlanetaEl.textContent = planeta.descricao[idioma];
        }

        // Atualiza o link (href não muda com o idioma)
        if (linkPlanetaEl) {
            linkPlanetaEl.href = planeta.link;
        }
    }
    
    /**
     * Atualiza todas as caixas visíveis no carrossel com base no idioma fornecido.
     * @param {string} idioma - O idioma para o qual atualizar ('pt' ou 'en').
     */
    function atualizarTodasCaixas(idioma) {
        // Verifica se o idioma fornecido é válido, senão usa o global `idiomaAtual`
        const idiomaParaUsar = (idioma === 'pt' || idioma === 'en') ? idioma : idiomaAtual;
        
        caixas.forEach((caixa, index) => {
            // O índice da caixa (0 a 4) mapeia para um índice de planeta (indicesCaixas[index])
            atualizarConteudoCaixa(caixa, indicesCaixas[index], idiomaParaUsar);
        });
    }
    
    // --- Funções de Navegação --- 

    /**
     * Move o carrossel para o próximo conjunto de planetas.
     */
    function moverProximo() {
        // Incrementa cada índice no array de índices visíveis
        indicesCaixas = indicesCaixas.map(indice => indice + 1);
        // Re-renderiza todas as caixas com os novos planetas e no idioma atual
        atualizarTodasCaixas(idiomaAtual);
    }
    
    /**
     * Move o carrossel para o conjunto anterior de planetas.
     */
    function moverAnterior() {
        // Decrementa cada índice no array de índices visíveis
        indicesCaixas = indicesCaixas.map(indice => indice - 1);
        // Re-renderiza todas as caixas com os novos planetas e no idioma atual
        atualizarTodasCaixas(idiomaAtual);
    }
    
    // --- Event Listeners e Inicialização ---

    // Adiciona eventos de clique aos botões de navegação
    if (btnAnterior) {
        btnAnterior.addEventListener('click', moverAnterior);
    } else {
        console.error("Botão 'anterior' do carrossel não encontrado.");
    }
    
    if (btnProximo) {
        btnProximo.addEventListener('click', moverProximo);
    } else {
        console.error("Botão 'próximo' do carrossel não encontrado.");
    }
    
    // --- Integração com o Tradutor --- 

    /**
     * Função globalmente acessível para ser chamada pelo script tradutor.
     * Atualiza o carrossel para refletir o novo idioma.
     * @param {string} novoIdioma - O idioma para o qual o carrossel deve ser atualizado ('pt' ou 'en').
     */
    window.atualizarCarrosselComIdioma = function(novoIdioma) {
        // Chama a função interna para atualizar as caixas com o novo idioma
        atualizarTodasCaixas(novoIdioma);
    }

    // Inicializa o carrossel com o idioma padrão ('pt') ao carregar a página.
    // A variável `idiomaAtual` é definida no script tradutorhome_fixed.js
    // Certifique-se de que tradutorhome_fixed.js seja carregado ANTES de carrossel_fixed.js no HTML.
    atualizarTodasCaixas(idiomaAtual); 

});

// --- FIM DO CÓDIGO CORRIGIDO ---
