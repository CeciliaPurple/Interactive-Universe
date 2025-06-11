document.getElementById('editNoticiaForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const idNoticia = 1; // ID da notícia a ser editada (substitua conforme necessário)
    const titulo = document.getElementById('titulo').value;
    const subTitulo = document.getElementById('subTitulo').value;
    const descricao = document.getElementById('descricao').value;
    const fotoCapa = document.getElementById('fotoCapa').value;
    const conteudo = document.getElementById('conteudo').value;

    const token = localStorage.getItem('token'); // Token de autenticação

    try {
        const response = await fetch(`http://localhost:4000/noticias/${idNoticia}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ TITULO: titulo, SUB_TITULO: subTitulo, DESCRICAO1: descricao, FOTO_CAPA: fotoCapa, CONTEUDO: conteudo })
        });

        if (response.ok) {
            alert('Notícia atualizada com sucesso!');
        } else {
            const errorData = await response.json();
            alert(`Erro ao atualizar notícia: ${errorData.error || 'Erro desconhecido'}`);
        }
    } catch (error) {
        console.error('Erro ao atualizar notícia:', error);
        alert('Erro ao conectar à API.');
    }
});