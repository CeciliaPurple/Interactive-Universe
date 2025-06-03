const animacao = document.querySelector('.animacao');
const noticia = document.querySelector('.noticias');

animacao.onclick = (e) => {
    e.preventDefault();
    noticia.classList.add('active');
}