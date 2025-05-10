const cards = Array.from(document.querySelectorAll('.carrossel .card'));
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const container = document.querySelector('#planeta');

function updateClasses() {
    cards.forEach(card => {
        card.classList.remove('caixa-P', 'caixa-M', 'caixa-G');
    });

    if (cards.length >= 5) {
        cards[0].classList.add('caixa-P');
        cards[1].classList.add('caixa-M');
        cards[2].classList.add('caixa-G');
        cards[3].classList.add('caixa-M');
        cards[4].classList.add('caixa-P');
    }
}

prev.addEventListener('click', () => {
    cards.unshift(cards.pop());
    cards.forEach(card => container.appendChild(card));
    updateClasses();
});

next.addEventListener('click', () => {
    cards.push(cards.shift());
    cards.forEach(card => container.appendChild(card));
    updateClasses();
});

updateClasses();