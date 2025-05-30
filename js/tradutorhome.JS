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
    "Mercúrio é pequeno, muito quente durante o dia e extremamente frio à noite,devido à falta de atmosfera": "Mercury is small, very hot during the day and extremely cold at night, due to the lack of atmosphere.",
    "Vênus é o segundo planeta do Sistema Solar,perto da Terra, mas com condições muito diferentes.": "Venus is the second planet in the Solar System, close to Earth, but with very different conditions.",
    "O planeta Terra é o terceiro planeta do Sistema Solar e o único conhecido até agora que possui vida.": "Planet Earth is the third planet in the Solar System and the only one known so far to have life.",
    "Marte é o quarto planeta do Sistema Solar. Conhecido como o 'planeta vermelho' devido à sua cor,causada pelo óxido de ferro": "Mars is the fourth planet in the Solar System. Known as the 'red planet' due to its color, caused by iron oxide.",
    "Júpiter é o maior planeta do Sistema Solar. Ele é um gigante gasoso,composto principalmente de hidrogênio e hélio.": "Jupiter is the largest planet in the Solar System. It is a gas giant, composed mainly of hydrogen and helium.",
    "Saturno é o sexto planeta a partir do Sol e o segundo maior do Sistema Solar, atrás apenas de Júpiter.": "Saturn is the sixth planet from the Sun and the second largest in the Solar System, behind only Jupiter.",
    "Urano é o sétimo planeta a contar do Sol, um gigante gasoso azul-esverdeado, e o terceiro maior do nosso sistema solar.": "Uranus is the seventh planet from the Sun, a blue-green gas giant, and the third largest in our solar system.",
    "Netuno é o oitavo planeta do Sistema Solar,o mais distante do Sol e é um gigante gasoso devido à presença de metano.": "Neptune is the eighth planet in the Solar System, the furthest from the Sun and is a gas giant due to the presence of methane.",
    "Vênus": "Venus",
    "Terra": "Earth",
    "Marte": "Mars",
    "Júpiter": "Jupiter",
    "Todos os direitos reservados.": "All rights reserved.",
    "© 2025 Sistema Solar. Todos os direitos reservados.": "© 2025 Solar System. All rights reserved."
};

// Função para alternar o idioma com base na bandeira clicada
function alternarIdioma(idioma) {
    const elementos = document.querySelectorAll("p, h1, h2, span, label, div");

    elementos.forEach(el => {
        const texto = el.innerText.trim();
        const traducao = idioma === 'pt'
            ? obterChavePorValor(traducoes, texto) // Traduz para português
            : traducoes[texto]; // Traduz para inglês

        if (traducao) {
            el.innerText = traducao;
        }
    });

    // Atualiza o idioma atual
    idiomaAtual = idioma;
}

// Adiciona eventos de clique às imagens das bandeiras
document.querySelector('.bandeira1[src="img/brasil.png"]').addEventListener('click', () => {
    alternarIdioma('pt'); // Altera para português
});

document.querySelector('.bandeira1[src="img/of-america.png"]').addEventListener('click', () => {
    alternarIdioma('en'); // Altera para inglês
});

// Função auxiliar para achar chave pelo valor
function obterChavePorValor(obj, valor) {
    return Object.keys(obj).find(chave => obj[chave] === valor);
}