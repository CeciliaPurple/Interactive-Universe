document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  let isAdmin = false;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      isAdmin = payload.TIPO === 'ADM';
    } catch {
      isAdmin = false;
    }
  }

  setupNebulosaAdminActions(isAdmin);
  carregarComentariosNebulosa();
});

function setupNebulosaAdminActions(isAdmin) {
  if (!isAdmin) return;

  const btnExcluirTodos = document.getElementById('btnExcluirTodos');
  if (!btnExcluirTodos) return;

  btnExcluirTodos.style.display = 'block';

  btnExcluirTodos.onclick = async () => {
    const confirmar = confirm('Tem certeza que deseja excluir todos os comentários?');
    if (!confirmar) return;

    const token = localStorage.getItem('token');

    try {
      const resposta = await fetch(`http://localhost:4000/comentario/noticia/2`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (resposta.ok) {
        alert('Todos os comentários foram excluídos.');
        carregarComentariosNebulosa();
      } else {
        alert('Erro ao excluir comentários.');
      }
    } catch (err) {
      console.error('Erro ao excluir comentários:', err);
      alert('Erro interno.');
    }
  };
}

async function carregarComentariosNebulosa() {
  const container = document.getElementById('comentarios');
  if (!container) return;

  container.innerHTML = '';

  try {
    const resposta = await fetch(`http://localhost:4000/comentario/noticia/2`);
    if (!resposta.ok) throw new Error('Erro na resposta da API');

    const comentarios = await resposta.json();

    comentarios.forEach(comentario => {
      const div = document.createElement('div');
      div.classList.add('comentario');

      const isAdm = comentario.usuario.TIPO === 'ADM';
      const seloAdm = isAdm ? '<span class="selo-adm">[ADM]</span>' : '';

      div.innerHTML = `
        <p><strong>${comentario.usuario.NOME} ${seloAdm}</strong></p>
        <p>${comentario.CONTEUDO}</p>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error('Erro ao carregar comentários:', err);
  }
}
