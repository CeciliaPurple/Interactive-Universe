let idiomaAtual = 'pt'; // Começa em português

const traducoes = {
    "Planetas": "Planets",
    "Notícias": "News",
    "Astros": "Stars",
    "Login": "Login",
    "Entrar": "Sign In",
    "Cadastrar": "Register",
    "Sistema Solar": "Solar System",
    "Universo Interativo": "Interactive Universe",
    "O GRANDE FENÔMENO": "THE GREAT PHENOMENON",
     "Um eclipse lunar é um fenômeno astronômico fascinante que ocorre quando a Terra se posiciona entre o Sol e a Lua, fazendo com que a sombra da Terra seja projetada sobre a Lua. Esse evento só acontece durante a Lua cheia, e pode ser observado a olho nu, sem equipamentos especiais, desde que o céu esteja limpo.Durante um eclipse lunar, a Luz do Sol, que normalmente ilumina a Lua cheia, é bloqueada pela Terra, que fica exatamente entre os dois astros. A Lua, então, escurece parcialmente ou totalmente por um período que pode durar várias horas.": "A lunar eclipse is a fascinating astronomical phenomenon that occurs when the Earth is positioned between the Sun and the Moon, causing the Earth's shadow to be cast onto the Moon. This event only occurs during a full Moon, and can be observed with the naked eye, without special equipment, as long as the sky is clear. During a lunar eclipse, the Sun's light, which normally illuminates the full Moon, is blocked by the Earth, which is located directly between the two celestial bodies. The Moon then darkens partially or completely for a period that can last several hours.",
    "Eclipse Lunar": "Lunar Eclipse",
    "O ENCANTO CÓSMICO DAS": "THE COSMIC CHARM OF",
    "Nebulosas": "Nebulae",
      "No vasto universo, entre as estrelas e os planetas, existem enormes nuvens compostas de gás e poeira chamadas nebulosas. Essas estruturas são fundamentais para a compreensão da formação, evolução e morte das estrelas. As nebulosas não são apenas belos objetos celestes, mas também os ambientes onde estrelas nascem e, em muitos casos, onde elas terminam suas vidas. Vamos explorar, em detalhes, o que são as nebulosas, como se formam, seus diferentes tipos e seu papel essencial no ciclo de vida estelar": "In the vast universe, between the stars and planets, there are enormous clouds of gas and dust called nebulae. These structures are fundamental to understanding the formation, evolution and death of stars. Nebulae are not only beautiful celestial objects, but also the environments where stars are born and, in many cases, where they end their lives. Let's explore in detail what nebulae are, how they form, their different types and their essential role in the stellar life cycle.",
    "Mercúrio": "Mercury",
    "Vênus": "Venus",
    "Terra": "Earth",
    "Marte": "Mars",
    "Júpiter": "Jupiter",
    "Todos os direitos reservados.": "All rights reserved.",
    "© 2025 Sistema Solar. Todos os direitos reservados.": "© 2025 Solar System. All rights reserved."
};

// Função para alternar o idioma
function alternarIdioma() {
    const elementos = document.querySelectorAll("p, h1, h2, span, label");

    elementos.forEach(el => {
        const texto = el.innerText.trim();
        const traducao = idiomaAtual === 'pt'
            ? traducoes[texto]
            : obterChavePorValor(traducoes, texto);

        if (traducao) {
            el.innerText = traducao;
        }
    });

    // Alterna o idioma atual
    idiomaAtual = idiomaAtual === 'pt' ? 'en' : 'pt';
}



document.addEventListener(('click'), function (e)  {
    const tradutor = document.getElementById('tradutor');
} )

// Função auxiliar para achar chave pelo valor
function obterChavePorValor(obj, valor) {
    return Object.keys(obj).find(chave => obj[chave] === valor);
}
