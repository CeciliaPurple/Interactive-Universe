document.addEventListener('DOMContentLoaded', function () {
    if (!window.adminDetector) {
        window.adminDetector = new AdminDetector();
    }

    setupIndexAdminActions();
});

function setupIndexAdminActions() {
    if (window.adminDetector && window.adminDetector.isAdmin) {
        const btnExcluirTodos = document.getElementById('btnExcluirTodos');
        if (btnExcluirTodos) {
            btnExcluirTodos.style.display = 'block';

            btnExcluirTodos.addEventListener('click', async () => {
                const confirmar = confirm('Tem certeza que deseja excluir todos os comentários?');
                if (!confirmar) return;

                const token = localStorage.getItem('token');
                try {
                    const resposta = await fetch(`http://localhost:4000/comentarios/noticia/ID_DA_NOTICIA`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (resposta.ok) {
                        alert('Todos os comentários foram excluídos.');
                        carregarComentarios();
                    } else {
                        alert('Erro ao excluir comentários.');
                    }
                } catch (err) {
                    console.error('Erro ao excluir comentários:', err);
                    alert('Erro interno.');
                }
            });
        }
    }
}
