const animacao = document.querySelector('.animacao');
const noticia = document.querySelector('.noticias');

animacao.onclick = (e) => {
    noticia.classList.remove('active'); 
    void noticia.offsetWidth; 
    noticia.classList.add('active'); 
};