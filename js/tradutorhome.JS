// --- INÍCIO DO CÓDIGO CORRIGIDO ---

// Variável global para armazenar o idioma atual. Começa em português.
// É importante que seja global ou acessível por ambos os scripts (tradutor e carrossel).
let idiomaAtual = 'pt';

// Objeto de traduções refatorado usando chaves únicas (data-translate-key)
// Cada chave mapeia para um objeto com as traduções PT e EN.
const traducoes = {
    // Menu Header
    "menu.planets": { pt: "Planetas", en: "Planets" },
    "menu.news": { pt: "Notícias", en: "News" },
    "menu.stars": { pt: "Astros", en: "Stars" },
    "menu.login": { pt: "Login", en: "Login" },
    "menu.signin": { pt: "Entrar", en: "Sign In" },
    "menu.register": { pt: "Cadastrar", en: "Register" },

    // Banner
    "banner.title": { pt: "Sistema Solar", en: "Solar System" },
    "banner.subtitle": { pt: "Universo Interativo", en: "Interactive Universe" },

    // Seção Notícias
    "news.eclipse.phenomenon": { pt: "O GRANDE FENÔMENO", en: "THE GREAT PHENOMENON" },
    "news.eclipse.title": { pt: "Eclipse Lunar", en: "Lunar Eclipse" },
    "news.eclipse.text": { 
        pt: "Um eclipse lunar é um fenômeno astronômico fascinante que ocorre quando a Terra se posiciona entre o Sol e a Lua, fazendo com que a sombra da Terra seja projetada sobre a Lua. Esse evento só acontece durante a Lua cheia, e pode ser observado a olho nu, sem equipamentos especiais, desde que o céu esteja limpo. Durante um eclipse lunar, a Luz do Sol, que normalmente ilumina a Lua cheia, é bloqueada pela Terra, que fica exatamente entre os dois astros. A Lua, então, escurece parcialmente ou totalmente por um período que pode durar várias horas.", 
        en: "A lunar eclipse is a fascinating astronomical phenomenon that occurs when the Earth is positioned between the Sun and the Moon, causing the Earth's shadow to be cast onto the Moon. This event only occurs during a full Moon, and can be observed with the naked eye, without special equipment, as long as the sky is clear. During a lunar eclipse, the Sun's light, which normally illuminates the full Moon, is blocked by the Earth, which is located directly between the two celestial bodies. The Moon then darkens partially or completely for a period that can last several hours."
    },
    "news.nebulae.charm": { pt: "O ENCANTO CÓSMICO DAS", en: "THE COSMIC CHARM OF" },
    "news.nebulae.title": { pt: "Nebulosas", en: "Nebulae" },
    "news.nebulae.text": { 
        pt: "No vasto universo, entre as estrelas e os planetas, existem enormes nuvens compostas de gás e poeira chamadas nebulosas. Essas estruturas são fundamentais para a compreensão da formação, evolução e morte das estrelas. As nebulosas não são apenas belos objetos celestes, mas também os ambientes onde estrelas nascem e, em muitos casos, onde elas terminam suas vidas. Vamos explorar, em detalhes, o que são as nebulosas, como se formam, seus diferentes tipos e seu papel essencial no ciclo de vida estelar", 
        en: "In the vast universe, between the stars and planets, there are enormous clouds of gas and dust called nebulae. These structures are fundamental to understanding the formation, evolution and death of stars. Nebulae are not only beautiful celestial objects, but also the environments where stars are born and, in many cases, where they end their lives. Let's explore in detail what nebulae are, how they form, their different types and their essential role in the stellar life cycle."
    },

    // Footer
    "footer.copyright": { pt: "© 2025 Sistema Solar. Todos os direitos reservados.", en: "© 2025 Solar System. All rights reserved." }
};

/**
 * Função principal para alternar o idioma da página.
 * @param {string} novoIdioma - O novo idioma ('pt' ou 'en').
 */
function alternarIdioma(novoIdioma) {
    // 1. Atualiza o idioma atual globalmente
    idiomaAtual = novoIdioma;

    // 2. Traduz todos os elementos estáticos que possuem o atributo 'data-translate-key'
    const elementosParaTraduzir = document.querySelectorAll('[data-translate-key]');
    
    elementosParaTraduzir.forEach(el => {
        const chave = el.getAttribute('data-translate-key');
        const traducao = traducoes[chave] ? traducoes[chave][idiomaAtual] : null;

        // Verifica se a tradução existe para a chave e idioma atuais
        if (traducao) {
            // Atualiza o conteúdo do elemento.
            // Usar textContent é geralmente mais seguro e performático que innerText.
            el.textContent = traducao;
        } else {
            // Opcional: Logar um aviso se uma chave de tradução não for encontrada
            // console.warn(`Chave de tradução não encontrada: ${chave} para o idioma ${idiomaAtual}`);
        }
    });

    // 3. Chama a função para atualizar o carrossel com o novo idioma
    // Garante que o conteúdo dinâmico do carrossel também seja traduzido.
    // Verifica se a função do carrossel existe antes de chamar.
    if (typeof atualizarCarrosselComIdioma === 'function') {
        atualizarCarrosselComIdioma(idiomaAtual);
    } else {
        console.error("Erro: Função 'atualizarCarrosselComIdioma' não encontrada. O carrossel não será traduzido.");
    }
}

// Adiciona eventos de clique às imagens das bandeiras após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    const bandeiraBrasil = document.querySelector('.bandeira1[src="img/brasil.png"]');
    const bandeiraEUA = document.querySelector('.bandeira1[src="img/of-america.png"]');

    if (bandeiraBrasil) {
        bandeiraBrasil.addEventListener('click', () => {
            alternarIdioma('pt'); // Altera para português
        });
    } else {
        console.error("Elemento da bandeira do Brasil não encontrado.");
    }

    if (bandeiraEUA) {
        bandeiraEUA.addEventListener('click', () => {
            alternarIdioma('en'); // Altera para inglês
        });
    } else {
        console.error("Elemento da bandeira dos EUA não encontrado.");
    }

    // Garante que o idioma inicial seja aplicado ao carregar a página
    // Isso é útil se o usuário tiver selecionado um idioma diferente de 'pt' anteriormente
    // (requer persistência do idioma, por exemplo, em localStorage, não implementado aqui)
    // Por enquanto, apenas garante que o carrossel inicialize com 'pt'
    if (typeof atualizarCarrosselComIdioma === 'function') {
        atualizarCarrosselComIdioma(idiomaAtual);
    }
});

// A função obterChavePorValor foi removida pois não é mais necessária com a abordagem de data-translate-key.

// --- FIM DO CÓDIGO CORRIGIDO ---
