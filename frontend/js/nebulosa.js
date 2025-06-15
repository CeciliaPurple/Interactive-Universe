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
        showMessage('Todos os comentários foram excluídos.', 'success');
        carregarComentariosNebulosa();
      } else {
        showMessage('Erro ao excluir comentários.', 'error');
      }
    } catch (err) {
      console.error('Erro ao excluir comentários:', err);
      showMessage('Erro interno.', 'error');
    }
  };
}

async function carregarComentariosNebulosa() {
  const container = document.getElementById('comentarios');
  if (!container) {
    console.error('Container #comentarios não encontrado');
    return;
  }

  // Mostrar loading
  container.innerHTML = '<p>Carregando comentários...</p>';

  try {
    console.log('Fazendo requisição para: http://localhost:4000/comentario/noticia/2');
    
    const resposta = await fetch(`http://localhost:4000/comentario/noticia/2`);
    
    console.log('Status da resposta:', resposta.status);
    console.log('Headers da resposta:', resposta.headers);
    
    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status} - ${resposta.statusText}`);
    }

    const dados = await resposta.json();
    console.log('Dados recebidos:', dados);
    console.log('Tipo dos dados:', typeof dados);
    console.log('É array?', Array.isArray(dados));

    // Verificar se os dados são um array ou se estão dentro de uma propriedade
    let comentarios;
    
    if (Array.isArray(dados)) {
      comentarios = dados;
    } else if (dados && Array.isArray(dados.comentarios)) {
      comentarios = dados.comentarios;
    } else if (dados && Array.isArray(dados.data)) {
      comentarios = dados.data;
    } else if (dados && Array.isArray(dados.results)) {
      comentarios = dados.results;
    } else {
      console.error('Formato de dados não reconhecido:', dados);
      container.innerHTML = '<p>Erro: Formato de dados inválido</p>';
      return;
    }

    console.log('Comentários processados:', comentarios);
    console.log('Quantidade de comentários:', comentarios.length);

    // Limpar container
    container.innerHTML = '';

    if (comentarios.length === 0) {
      container.innerHTML = '<p>Nenhum comentário encontrado.</p>';
      return;
    }

    comentarios.forEach((comentario, index) => {
      console.log(`Processando comentário ${index}:`, comentario);
      
      const div = document.createElement('div');
      div.classList.add('comentario');

      // Verificar se o comentário tem a estrutura esperada
      if (!comentario || !comentario.usuario) {
        console.warn('Comentário com estrutura inválida:', comentario);
        return;
      }

      const isAdm = comentario.usuario.TIPO === 'ADM';
      const seloAdm = isAdm ? '<span class="selo-adm">[ADM]</span>' : '';

      div.innerHTML = `
        <p><strong>${comentario.usuario.NOME || 'Usuário'} ${seloAdm}</strong></p>
        <p>${comentario.CONTEUDO || 'Sem conteúdo'}</p>
      `;

      container.appendChild(div);
    });

    console.log('Comentários carregados com sucesso');

  } catch (err) {
    console.error('Erro ao carregar comentários:', err);
    container.innerHTML = '<p>Erro ao carregar comentários. Verifique o console para mais detalhes.</p>';
    
    // Se a função showMessage existir, use ela
    if (typeof showMessage === 'function') {
      showMessage('Erro ao carregar comentários.', 'error');
    }
  }
}

// Função showMessage (caso não exista em outro arquivo)
function showMessage(text, type = 'success') {
  const messageDiv = document.getElementById('message');
  if (!messageDiv) {
    console.warn('Elemento #message não encontrado, usando alert');
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