// Corrige a seleção do formulário
const formLogin = document.querySelector(".form"); // Atualizado para corresponder à classe correta

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita recarregar a página

  // Pega os valores do formulário
  const nome = document.getElementById("Nome").value.trim(); // Corrige o ID para 'Nome'
  const senha = document.getElementById("password").value.trim(); // Corrige o ID para 'password'

  try {
    // Faz uma requisição para verificar o nome e a senha no banco
    const response = await fetch("http://localhost:4000/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, senha }),
    });

    if (response.ok) {
      const data = await response.json();

      // Salva o token no localStorage
      localStorage.setItem("token", data.token);

      alert(`Bem-vindo, ${nome}!`);
      console.log("Formulário enviado!");
      // Redireciona para a página principal (index.html) após login bem-sucedido
      window.location.href = "./index.html"; // Certifique-se de que o caminho está correto
    } else {
      const errorData = await response.json();
      console.error(errorData);
      alert(
        `Erro ao fazer login: ${errorData.error || "Nome ou senha incorretos"}`
      );
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro ao conectar com a API.");
  }
});
