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
    "Eclipse Lunar": "Lunar Eclipse",
    "O ENCANTO CÓSMICO DAS": "THE COSMIC CHARM OF",
    "Nebulosas": "Nebulae",
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
