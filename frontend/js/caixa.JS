document.addEventListener('DOMContentLoaded', () => {
  const comentariosContainer = document.getElementById('comentarios-container');
  const adicionarBtn = document.getElementById('adicionar-btn');
  const comentarioInput = document.getElementById('comentario-input');

  // PEGANDO O ID DINÂMICO DA NOTÍCIA DA PÁGINA
  const noticiaId = document.querySelector('[data-noticia-id]')?.getAttribute('data-noticia-id');
  if (!noticiaId) {
    console.warn("ID da notícia não encontrado na página.");
    return;
  }

  const baseURL = 'http://localhost:4000/comentario';
  const listarComentariosURL = `${baseURL}/noticia/${noticiaId}`;

  // ... resto do seu código continua igual ...


      let comentarios = [];
      let usuarioLogadoId = null;

      // Recuperar token do localStorage
      function getToken() {
        return localStorage.getItem('token');
      }

      // Decodificar o token para obter o ID do usuário logado
      function getUsuarioIdDoToken(token) {
        if (!token) return null;
        try {
          const payload = token.split('.')[1];
          const decoded = JSON.parse(atob(payload));
          return decoded.ID;
        } catch (error) {
          console.error('Erro ao decodificar token:', error);
          return null;
        }
      }

      // Buscar comentários da notícia
      async function buscarComentarios() {
        try {
          const res = await fetch(listarComentariosURL);
          if (!res.ok) throw new Error('Erro ao buscar comentários');

          const data = await res.json();
          comentarios = data.comentarios;

          const token = getToken();
          usuarioLogadoId = getUsuarioIdDoToken(token);

          renderComentarios();
        } catch (err) {
          console.error(err);
          alert('Erro ao carregar comentários.');
        }
      }

      // Renderizar comentários na página
function renderComentarios() {
  comentariosContainer.innerHTML = '';

  comentarios.forEach((comentario, index) => {
    const comentarioEl = document.createElement('div');
    comentarioEl.className = 'comentario';
    comentarioEl.setAttribute('data-index', index);

    const textoEl = document.createElement('p');
    textoEl.textContent = comentario.texto;
    textoEl.className = 'texto-comentario';

    // 🔽 Novo bloco: Info com email + data
    const infoEl = document.createElement('small');
    const nome = comentario.usuario?.nome || 'Usuário';
    const email = comentario.usuario?.email || 'desconhecido@email.com';
    const data = new Date(comentario.dataPost).toLocaleString('pt-BR');
    infoEl.innerHTML = `<strong>${nome} (${email}) — ${data}</strong>`;  
    infoEl.className = 'info-comentario';
    // 🔼 Fim do bloco novo

    const autorId = comentario.usuario.id;
    const botoesDiv = document.createElement('div');
    botoesDiv.className = 'botoes';

    if (usuarioLogadoId && usuarioLogadoId === autorId) {
      const btnAtualizar = document.createElement('button');
      btnAtualizar.textContent = 'Atualizar';
      btnAtualizar.addEventListener('click', () => {
        textoEl.contentEditable = 'true';
        textoEl.focus();
        textoEl.dataset.original = comentario.texto;
      });

      textoEl.addEventListener('input', () => {
        if (textoEl.isContentEditable) {
          comentario.texto = textoEl.textContent.trim();
        }
      });

      textoEl.addEventListener('dblclick', () => {
        if (textoEl.isContentEditable) {
          textoEl.contentEditable = 'false';
          textoEl.textContent = textoEl.dataset.original;
          comentario.texto = textoEl.dataset.original;
        }
      });

      const btnSalvar = document.createElement('button');
      btnSalvar.textContent = 'Salvar';
      btnSalvar.addEventListener('click', async () => {
        textoEl.contentEditable = 'false';
        try {
          await atualizarComentario(comentario.id, comentario.texto);
          await buscarComentarios();
        } catch {
          alert('Erro ao atualizar comentário.');
          textoEl.textContent = textoEl.dataset.original;
        }
      });

      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.addEventListener('click', async () => {
        if (confirm('Deseja realmente excluir este comentário?')) {
          try {
            await excluirComentario(comentario.id);
            await buscarComentarios();
          } catch {
            alert('Erro ao excluir comentário.');
          }
        }
      });

      botoesDiv.appendChild(btnAtualizar);
      botoesDiv.appendChild(btnSalvar);
      botoesDiv.appendChild(btnExcluir);
    }

    comentarioEl.appendChild(textoEl);
    comentarioEl.appendChild(infoEl); // 👈 Adiciona aqui embaixo do texto
    comentarioEl.appendChild(botoesDiv);
    comentariosContainer.appendChild(comentarioEl);
  });
}


      // Criar novo comentário
      adicionarBtn.addEventListener('click', async () => {
        const texto = comentarioInput.value.trim();
        if (!texto) return alert('Digite um comentário.');

        const token = getToken();
        if (!token) return alert('Você precisa estar logado para comentar.');

        try {
          const res = await fetch(baseURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({ texto, noticiaId }),
          });

          if (!res.ok) throw new Error('Erro ao enviar comentário');

          comentarioInput.value = '';
          await buscarComentarios();
        } catch (err) {
          console.error(err);
          alert('Erro ao enviar comentário.');
        }
      });

      // Atualizar comentário
      async function atualizarComentario(id, texto) {
        const token = getToken();
        if (!token) throw new Error('Token não encontrado');

        const res = await fetch(`${baseURL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ texto }),
        });

        if (!res.ok) throw new Error('Erro ao atualizar comentário');
      }

      // Excluir comentário
      async function excluirComentario(id) {
        const token = getToken();
        if (!token) throw new Error('Token não encontrado');

        const res = await fetch(`${baseURL}/${id}`, {
          method: 'DELETE',
          headers: {  
            'Authorization': 'Bearer ' + token,
          },
        });

        if (!res.ok) throw new Error('Erro ao excluir comentário');
      }

      // Buscar comentários ao carregar a página
      buscarComentarios();
    });
