document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem("token");
  const usuarioNome = localStorage.getItem('usuarioNome');

  // Seleciona o elemento de login original
  const loginLabel = document.querySelector('.login');

  if(token && loginLabel) {
    // Se o token existir, substitui o texto do elemento de login
    loginLabel.outerHTML = `<a href="atualização.html" title="${usuarioNome || 'Meu perfil'}">
       <img src="img/usuário-64.png" alt="Usuário" class="login1" />
       </a>`;
  } else {
    // Se não houver token verifica se estamos numa pagina protegida
    const paginaAtual = window.location.pathname.split('/').pop();
    const paginasProtegidas = ['atualização.html','adm.html'];

    if(paginasProtegidas.includes(paginaAtual)){
      // Se estivermos numa pagina protegida e não houver token, redireciona para a pagina de login
      alert('Você precisa estar logado para acessar esta página.');
      window.location.href = 'login.html';
    }
  }

  // --- CÓDIGO PARA MOSTRAR ÍCONE DE ADMIN ---
  function getUsuarioInfoDoToken(token) {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return {
        tipo: decoded.TIPO?.toUpperCase(),
        nome: decoded.NOME || decoded.nome || 'Usuário'
      };
    } catch {
      return null;
    }
  }
  function mostrarIconeAdmin() {
    const usuario = getUsuarioInfoDoToken(token);
  
    if (usuario && usuario.tipo === 'ADM') {
      let container = document.getElementById('admin-icon-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'admin-icon-container';
  

  
        // Texto "ADM"
        const texto = document.createElement('span');
        texto.textContent = 'ADM';
        texto.style.marginRight = '6px';
  
        // Ícone de coroa (emoji)
        const coroa = document.createElement('span');
        coroa.textContent = '👑';
        coroa.style.fontSize = '18px';
        coroa.style.bottom = '2px';
        coroa.style.position = 'relative';
        coroa.style.transform = 'scale(1.03)';
  
        container.appendChild(texto);
        container.appendChild(coroa);
  
        document.body.appendChild(container);
      }
    }
  }
  

  mostrarIconeAdmin();
});
