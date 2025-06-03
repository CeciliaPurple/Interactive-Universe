const comentariosContainer = document.getElementById('comentarios-container');
const adicionarBtn = document.getElementById('adicionar-btn');
const comentarioInput = document.getElementById('comentario-input');

let comentarios = [];

function renderComentarios() {
    comentariosContainer.innerHTML = ''; // Limpa os comentários existentes

    comentarios.forEach((comentario, index) => {
        const comentarioEl = document.createElement('div');
        comentarioEl.className = 'comentario';
        comentarioEl.setAttribute('data-index', index);

        // Parágrafo para o texto
        const textoEl = document.createElement('p');
        textoEl.textContent = comentario.texto;
        textoEl.className = 'texto-comentario';

        // Div para os botões
        const botoesDiv = document.createElement('div');
        botoesDiv.className = 'botoes';

        // Botão "Atualizar"
        const btnAtualizar = document.createElement('button1');
        btnAtualizar.textContent = 'Atualizar';
        btnAtualizar.addEventListener('click', () => {
            textoEl.contentEditable = 'true';
            textoEl.focus();
            textoEl.dataset.original = comentario.texto;
        });

        // Atualiza o texto do comentário em tempo real
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

        // Botão "Excluir"
        const btnExcluir = document.createElement('button2');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => {
            comentarios.splice(index, 1);
            renderComentarios();
        });

        // Montagem do comentário
        botoesDiv.appendChild(btnAtualizar);
        botoesDiv.appendChild(btnExcluir);

        comentarioEl.appendChild(textoEl);
        comentarioEl.appendChild(botoesDiv);
        comentariosContainer.appendChild(comentarioEl);
    });
}

adicionarBtn.addEventListener('click', () => {
    const texto = comentarioInput.value.trim();
    if (texto !== '') {
        comentarios.push({ texto });
        comentarioInput.value = '';

        if (comentarios.length > 5) {
            comentarios.shift();
        }

        renderComentarios();
    }
});

window.onload = renderComentarios;