// Função para adicionar um comentário
function addComment() {
  const commentText = document.getElementById("comment-text").value;

  if (commentText.trim() !== "") {
    // Recupera os comentários armazenados no localStorage
    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    // Se já houver 5 comentários, remove o mais antigo (primeiro da lista)
    if (comments.length >= 5) {
      comments.shift();
    }

    // Adiciona o novo comentário ao final da lista
    comments.push(commentText);

    // Salva os comentários atualizados no localStorage
    localStorage.setItem("comments", JSON.stringify(comments));

    // Limpa o campo de texto
    document.getElementById("comment-text").value = "";

    // Atualiza o histórico de comentários
    displayComments();
  }
}

// Função para exibir os comentários armazenados
function displayComments() {
  const commentHistory = document.getElementById("comment-history");
  commentHistory.innerHTML = "<h2>Histórico de Comentários:</h2>"; // Título

  // Recupera os comentários do localStorage
  const comments = JSON.parse(localStorage.getItem("comments")) || [];

  // Exibe cada comentário
  comments.forEach(comment => {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.textContent = comment;
    commentHistory.appendChild(commentElement);
  });
}

// Exibe os comentários já existentes assim que a página é carregada
window.onload = displayComments;