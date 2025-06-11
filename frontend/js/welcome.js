// Script de Animação Simplificado - EXECUÇÃO IMEDIATA
// Cole este código no <head> do seu HTML, não no final do body

// PRIMEIRO: Criar CSS inline diretamente
const style = document.createElement('style');
style.innerHTML = `
    /* Overlay de boas-vindas - MÁXIMA PRIORIDADE */
    #welcomeScreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #1a1a2e;
        background: linear-gradient(135deg,rgb(33, 30, 54) 0%,rgb(21, 21, 32) 50%,rgb(9, 8, 14) 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
        font-family: 'Poppins', Arial, sans-serif;
    }
    
    #welcomeText {
        color: #ffffff;
        font-size: 4vw;
        font-weight: 600;
        text-align: center;
        text-shadow: 0 0 20px rgba(255,255,255,0.5);
        letter-spacing: 3px;
        animation: welcomeGlow 2s ease-in-out infinite alternate;
    }
    
    @keyframes welcomeGlow {
        from { text-shadow: 0 0 20px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3); }
        to { text-shadow: 0 0 30px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.5); }
    }
    
    .fade-out-welcome {
        animation: fadeOut 1s ease-out forwards;
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            visibility: hidden;
        }
    }
    
    /* Esconder site inicialmente */
    .hide-content {
        visibility: hidden !important;
    }
    
    .show-content {
        visibility: visible !important;
        animation: showSite 1s ease-out;
    }
    
    @keyframes showSite {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    /* Cursor digitação */
    .cursor {
        display: inline;
        background: white;
        width: 2px;
        height: 1em;
        animation: blink 1s infinite;
        margin-left: 2px;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @media (max-width: 768px) {
        #welcomeText {
            font-size: 8vw;
            padding: 0 20px;
        }
    }
`;
document.head.appendChild(style);

// SEGUNDO: Criar HTML do overlay IMEDIATAMENTE
const welcomeHTML = `
    <div id="welcomeScreen">
        <div id="welcomeText">Bem-vindo ao...</div>
    </div>
`;

// TERCEIRO: Inserir overlay no body assim que o script executa
document.addEventListener('DOMContentLoaded', function() {
    // Se por algum motivo o DOMContentLoaded já passou, executa direto
    initWelcome();
});

// Se o DOM já está pronto, executa imediatamente
if (document.readyState !== 'loading') {
    initWelcome();
}

function initWelcome() {
    console.log('🚀 Iniciando animação de boas-vindas...');
    
    // Esconder todo o conteúdo do site
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    if (main) main.classList.add('hide-content');
    if (footer) footer.classList.add('hide-content');
    
    // Inserir overlay
    document.body.insertAdjacentHTML('afterbegin', welcomeHTML);
    
    const welcomeScreen = document.getElementById('welcomeScreen');
    const welcomeText = document.getElementById('welcomeText');
    
    console.log('✅ Overlay criado:', welcomeScreen);
    console.log('✅ Texto criado:', welcomeText);
    
    // Após 3 segundos, iniciar transição
    setTimeout(() => {
        console.log('⏰ Iniciando fade out...');
        welcomeScreen.classList.add('fade-out-welcome');
        
        // Após fade out, mostrar site e iniciar digitação
        setTimeout(() => {
            console.log('🎬 Removendo overlay e mostrando site...');
            welcomeScreen.remove();
            
            // Mostrar conteúdo do site
            if (main) main.classList.replace('hide-content', 'show-content');
            if (footer) footer.classList.replace('hide-content', 'show-content');
            
            // Iniciar digitação do título
            setTimeout(() => {
                startTyping();
            }, 500);
            
        }, 1000);
    }, 3000);
}

function startTyping() {
    console.log('⌨️ Iniciando digitação...');
    
    const titleElement = document.querySelector('.titulo');
    if (!titleElement) {
        console.error('❌ Elemento .titulo não encontrado!');
        return;
    }
    
    console.log('✅ Elemento título encontrado:', titleElement);
    
    // Limpar texto atual
    titleElement.innerHTML = '';
    
    const textToType = 'Sistema Solar';
    let index = 0;
    
    function typeChar() {
        if (index < textToType.length) {
            titleElement.innerHTML = textToType.substring(0, index + 1) + '<span class="cursor">|</span>';
            index++;
            setTimeout(typeChar, 150);
        } else {
            // Remover cursor após 2 segundos
            setTimeout(() => {
                titleElement.innerHTML = textToType;
                animateSubtitle();
            }, 2000);
        }
    }
    
    typeChar();
}

function animateSubtitle() {
    const subtitle = document.querySelector('.sub-titulo');
    if (subtitle) {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(20px)';
        subtitle.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 200);
    }
}

// Permitir pular clicando
document.addEventListener('click', function(e) {
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen && e.target.closest('#welcomeScreen')) {
        console.log('⏭️ Animação pulada pelo usuário');
        welcomeScreen.remove();
        
        const main = document.querySelector('main');
        const footer = document.querySelector('footer');
        if (main) main.classList.replace('hide-content', 'show-content');
        if (footer) footer.classList.replace('hide-content', 'show-content');
        
        // Mostrar título completo
        const titleElement = document.querySelector('.titulo');
        if (titleElement) {
            titleElement.innerHTML = 'Sistema Solar';
        }
    }
});

console.log('📜 Script de boas-vindas carregado!');