const comentariosContainer = document.getElementById('comentarios-container');
const adicionarBtn = document.getElementById('adicionar-btn');
const comentarioInput = document.getElementById('comentario-input');

const apiURL = 'http://localhost:4000/comentario/1';
let comentarios = [];

function getToken() {
  return localStorage.getItem('token');
}

async function buscarComentarios() {
  const token = getToken();
  if (!token) {
    alert('Você precisa estar logado para ver os comentários.');
    return;
  }

  try {
    const res = await fetch(apiURL, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
    if (!res.ok) throw new Error('Erro ao buscar comentários');
    comentarios = await res.json();
    renderComentarios();
  } catch (err) {
    console.error(err);
    alert('Erro ao carregar comentários.');
  }
}

function renderComentarios() {
  comentariosContainer.innerHTML = '';

  comentarios.forEach((comentario, index) => {
    const comentarioEl = document.createElement('div');
    comentarioEl.className = 'comentario';
    comentarioEl.setAttribute('data-index', index);

    const textoEl = document.createElement('p');
    textoEl.textContent = comentario.texto;
    textoEl.className = 'texto-comentario';

    // Botões container
    const botoesDiv = document.createElement('div');
    botoesDiv.className = 'botoes';

    // Botão "Atualizar"
    const btnAtualizar = document.createElement('button');
    btnAtualizar.textContent = 'Atualizar';
    btnAtualizar.addEventListener('click', () => {
      textoEl.contentEditable = 'true';
      textoEl.focus();
      textoEl.dataset.original = comentario.texto;
    });

    // Atualiza o texto do comentário localmente ao digitar
    textoEl.addEventListener('input', () => {
      if (textoEl.isContentEditable) {
        comentario.texto = textoEl.textContent.trim();
      }
    });

    // Duplo clique para cancelar edição
    textoEl.addEventListener('dblclick', () => {
      if (textoEl.isContentEditable) {
        textoEl.contentEditable = 'false';
        textoEl.textContent = textoEl.dataset.original;
        comentario.texto = textoEl.dataset.original;
      }
    });

    // Botão para salvar edição
    const btnSalvar = document.createElement('button');
    btnSalvar.textContent = 'Salvar';
    btnSalvar.addEventListener('click', async () => {
      textoEl.contentEditable = 'false';
      try {
        await atualizarComentario(comentario.id, comentario.texto);
        buscarComentarios();
      } catch {
        alert('Erro ao atualizar comentário.');
        textoEl.textContent = textoEl.dataset.original;
      }
    });

    // Botão "Excluir"
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

    comentarioEl.appendChild(textoEl);
    comentarioEl.appendChild(botoesDiv);
    comentariosContainer.appendChild(comentarioEl);
  });
}

adicionarBtn.addEventListener('click', async () => {
  const texto = comentarioInput.value.trim();
  if (!texto) return alert('Digite um comentário.');

  const token = getToken();
  if (!token) return alert('Você precisa estar logado para comentar.');

  try {
    const res = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ texto }),
    });
    if (!res.ok) throw new Error('Erro ao enviar comentário');
    comentarioInput.value = '';
    await buscarComentarios();
  } catch (err) {
    console.error(err);
    alert('Erro ao enviar comentário.');
  }
});

async function atualizarComentario(id, texto) {
  const token = getToken();
  if (!token) throw new Error('Token não encontrado');

  const res = await fetch(`${apiURL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({ texto }),
  });
  if (!res.ok) throw new Error('Erro ao atualizar comentário');
}

async function excluirComentario(id) {
  const token = getToken();
  if (!token) throw new Error('Token não encontrado');

  const res = await fetch(`${apiURL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  });
  if (!res.ok) throw new Error('Erro ao excluir comentário');
}

window.onload = buscarComentarios;
