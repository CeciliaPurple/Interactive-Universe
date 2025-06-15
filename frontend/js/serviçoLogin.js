// Seleciona o formulário de login
const formLogin = document.querySelector(".form");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita o recarregamento da página

  // Pega os valores do formulário
  const nome = document.getElementById("Nome").value.trim();
  const senha = document.getElementById("password").value.trim();

  try {
    const response = await fetch("http://localhost:4000/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, senha }),
    });

    if (response.ok) {
      const data = await response.json();

      // Salva o token e o nome do usuário no localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuarioNome", nome);

      // Mostra mensagem de boas-vindas
      showMessage(`Bem-vindo(a), ${nome}!`, "success");

      // Redireciona após pequena pausa
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 1500);
    } else {
      // Tenta extrair o erro da resposta
      let errorText = "Nome ou senha incorretos.";
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorText = errorData.error;
        }
      } catch (jsonError) {
        console.warn("Erro ao interpretar resposta JSON:", jsonError);
      }

      showMessage(`Erro ao fazer login: ${errorText}`, "error");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    showMessage(`Erro ao conectar com o servidor.`, "error");
  }
});

// Função para mostrar mensagens visuais
function showMessage(text, type = "success") {
  console.log("Chamando showMessage com:", text); // <-- teste aqui
  const messageDiv = document.getElementById("message");
  if (!messageDiv) return;

  messageDiv.textContent = text;
  messageDiv.className = ""; // limpa classes anteriores
  messageDiv.classList.add("message", type); // adiciona nova classe e tipo
  messageDiv.style.display = "block";

  setTimeout(() => {  
    messageDiv.style.display = "none";
  }, 4000);
}
