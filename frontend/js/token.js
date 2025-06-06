//token.js

document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem("token");
  const usuarioNome = localStorage.getItem('usuarioNome');

  //seleciona o elemento de login original
  const loginLabel = document.querySelector('.login');

  if(token && loginLabel) {
    //se o token existir, substitui o texto do elemento de login
    loginLabel.outerHTML = `<a href="atualização.html" title="${usuarioNome || 'Meu perfil'}">
       <img src="img/usuário-64.png" alt="Usuário" class="login1" />
       </a>`;
  }else{
    //se não ouver token verifica se estamos numa pagina protegida
    const paginaAtual = window.location.pathname.split('/').pop();
    const paginasProtegidas = ['atualização.html','adm.html'];

    if(paginasProtegidas.includes(paginaAtual)){

      //se estivermos numa pagina protegida e não houver token, redireciona para a pagina de login
      alert('Você precisa estar logado para acessar esta página.');
      window.location.href = 'login.html';
    }
  }
})
