document.addEventListener('DOMContentLoaded', function() {
    const cards = Array.from(document.querySelectorAll('.carrossel .caixa-P, .carrossel .caixa-M, .carrossel .caixa-G'));
    const prev = document.querySelector('.seta-esq');
    const next = document.querySelector('.seta-dire');
    const container = document.querySelector('#planeta');

    // Garantir que as setas estejam sempre nas extremidades
    const setaEsq = document.querySelector('.seta-esq');
    const setaDire = document.querySelector('.seta-dire');
    
    // Remover as setas do container para reposicioná-las corretamente
    if (setaEsq && setaEsq.parentNode === container) {
        container.removeChild(setaEsq);
    }
    if (setaDire && setaDire.parentNode === container) {
        container.removeChild(setaDire);
    }
    
    // Adicionar as setas de volta nas extremidades
    container.insertBefore(setaEsq, container.firstChild);
    container.appendChild(setaDire);

    function updateClasses() {
        cards.forEach(card => {
            card.classList.remove('caixa-P', 'caixa-M', 'caixa-G');
            // Remover estilos inline anteriores
            card.style.transform = '';
            card.style.position = 'relative';
            card.style.transition = 'all 0.5s ease';
            card.style.bottom = '0'; // Reset bottom
        });

        if (cards.length >= 5) {
            // Primeiro planeta (extrema esquerda) - arco para cima
            cards[0].classList.add('caixa-P');
            cards[0].style.bottom = '-150px'; // Valor negativo para arco para cima
            
            // Segundo planeta (esquerda do centro) - arco para cima
            cards[1].classList.add('caixa-M');
            cards[1].style.bottom = '-50px'; // Valor negativo para arco para cima
            
            // Planeta central
            cards[2].classList.add('caixa-G');
            cards[2].style.bottom = '0px';
            
            cards[3].classList.add('caixa-M');
            cards[3].style.bottom = '-50px'; // Valor negativo para arco para cima
            
            cards[4].classList.add('caixa-P');
            cards[4].style.bottom = '-150px'; // Valor negativo para arco para cima
            
            cards.forEach((card, index) => {
                const nomePlaneta = card.querySelector('div:first-child');
                if (nomePlaneta) {
                    if (index === 0 || index === 4) {
                        nomePlaneta.classList.remove('nome-planeta');
                        nomePlaneta.classList.add('nome-planeta-P');
                    } else {
                        nomePlaneta.classList.remove('nome-planeta-P');
                        nomePlaneta.classList.add('nome-planeta');
                    }
                }
            });
        }
        
        if (setaEsq && setaEsq.parentNode === container) {
            container.removeChild(setaEsq);
        }
        if (setaDire && setaDire.parentNode === container) {
            container.removeChild(setaDire);
        }
        
        container.insertBefore(setaEsq, container.firstChild);
        container.appendChild(setaDire);
    }

    prev.addEventListener('click', () => {
        cards.unshift(cards.pop());
        
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        container.appendChild(setaEsq);
        
        cards.forEach(card => container.appendChild(card));
        
        container.appendChild(setaDire);
        
        updateClasses();
    });

    next.addEventListener('click', () => {
        cards.push(cards.shift());
        
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        container.appendChild(setaEsq);
        
        cards.forEach(card => container.appendChild(card));
        
        container.appendChild(setaDire);
        
        updateClasses();
    });


    updateClasses();
});
