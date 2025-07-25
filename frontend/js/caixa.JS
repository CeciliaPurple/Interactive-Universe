document.addEventListener('DOMContentLoaded', () => {
  const comentariosContainer = document.getElementById('comentarios-container');
  const adicionarBtn = document.getElementById('adicionar-btn');
  const comentarioInput = document.getElementById('comentario-input');

  // PEGANDO O ID DINÂMICO DA NOTÍCIA DA PÁGINA (atributo data-noticia-id no body, div ou outro elemento)
  const noticiaId = document.querySelector('[data-noticia-id]')?.getAttribute('data-noticia-id');
  if (!noticiaId) {
    console.warn("ID da notícia não encontrado na página.");
    return;   
  }

  const baseURL = 'http://localhost:4000/comentario';
  const listarComentariosURL = `${baseURL}/noticia/${noticiaId}`;

  let comentarios = [];
  let usuarioLogadoId = null;
  let isAdmin = false;

  // Recuperar token do localStorage
  function getToken() {
    return localStorage.getItem('token');
  }

  // Decodificar token para pegar ID e TIPO do usuário logado
  function getUsuarioInfoDoToken(token) {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return {
        id: decoded.ID,
        tipo: decoded.TIPO ? decoded.TIPO.toUpperCase() : 'USUARIO'
      };
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

      // Se a API retornar um array direto, adapte aqui, ex: data ou data.comentarios
      comentarios = Array.isArray(data) ? data : data.comentarios || [];

      const token = getToken();
      const usuarioInfo = getUsuarioInfoDoToken(token);
      usuarioLogadoId = usuarioInfo?.id || null;
      isAdmin = usuarioInfo?.tipo === 'ADM';

      renderComentarios();
    } catch (err) {
      console.error(err);
      showMessage('Erro ao carregar comentários.', 'error');
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

      // Info: nome, email e data
      const infoEl = document.createElement('small');
      const nome = comentario.usuario?.nome || 'Usuário';
      const email = comentario.usuario?.email || 'desconhecido@email.com';
      const data = new Date(comentario.dataPost).toLocaleString('pt-BR');
      //infoEl.innerHTML = `<strong>${nome} (${email}) — ${data}</strong>`;
      infoEl.innerHTML = `<strong>${nome} — ${data}</strong>`;
      infoEl.className = 'info-comentario';

      const autorId = comentario.usuario?.id || null;
      const botoesDiv = document.createElement('div');
      botoesDiv.className = 'botoes';

      // Mostrar botões Atualizar e Salvar só para autor do comentário
      if (usuarioLogadoId && usuarioLogadoId === autorId) {
        // Botão Atualizar
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

        // Botão Salvar
        const btnSalvar = document.createElement('button');
        btnSalvar.textContent = 'Salvar';
        btnSalvar.addEventListener('click', async () => {
          textoEl.contentEditable = 'false';
          try {
            await atualizarComentario(comentario.id, comentario.texto);
            showMessage('Comentário atualizado com sucesso.');
            await buscarComentarios();
          } catch {
            showMessage('Erro ao atualizar comentário.', 'error');
            textoEl.textContent = textoEl.dataset.original;
          }
        });

        botoesDiv.appendChild(btnAtualizar);
        botoesDiv.appendChild(btnSalvar);
      }

      // Mostrar botão Excluir para autor do comentário ou para ADM
      if ((usuarioLogadoId && usuarioLogadoId === autorId) || isAdmin) {
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';

        // Variável para controlar confirmação
        let confirmandoExclusao = false;

        btnExcluir.addEventListener('click', async () => {
          if (!confirmandoExclusao) {
            confirmandoExclusao = true;
            showMessage('Clique novamente para confirmar a exclusão.', 'error');

            // Cancela se não clicar em 5 segundos
            setTimeout(() => {
              confirmandoExclusao = false;
            }, 5000);
            return;
          }

          // Confirmado: agora pode excluir
          try {
            await excluirComentario(comentario.id);
            showMessage('Comentário excluído com sucesso.');
            await buscarComentarios();
          } catch {
            showMessage('Erro ao excluir comentário.', 'error');
          } finally {
            confirmandoExclusao = false;
          }
        });

        botoesDiv.appendChild(btnExcluir);
      }
      comentarioEl.appendChild(infoEl);
      comentarioEl.appendChild(textoEl);
      comentarioEl.appendChild(botoesDiv);
      comentariosContainer.appendChild(comentarioEl);
    });
  }

  // Criar novo comentário
  adicionarBtn.addEventListener('click', async () => {
    const texto = comentarioInput.value.trim();
    if (!texto) return showMessage('Digite um comentário.', 'error');

    const token = getToken();
    if (!token) return showMessage('Você precisa estar logado para comentar.', 'error');

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
      showMessage('Comentário enviado com sucesso!');
      await buscarComentarios();
    } catch (err) {
      console.error(err);
      showMessage('Erro ao enviar comentário.', 'error');
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

  // Função de mensagem
  function showMessage(text, type = 'success') {
    const messageDiv = document.getElementById('message');
    if (!messageDiv) {
      alert(text);
      return;
    }

    messageDiv.textContent = text;
    messageDiv.className = 'message';
    messageDiv.classList.add(type);
    messageDiv.style.display = 'block';

    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 4000);
  }

  // Iniciar buscando comentários ao carregar a página
  buscarComentarios();
});
