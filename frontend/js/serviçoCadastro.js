const form = document.querySelector('.form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // evita recarregar a página

    // Pega os valores do formulário
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // Monta o payload conforme esperado pela API
    const payload = {
      NOME: nome,
      EMAIL: email,
      SENHA: senha,
      TIPO_USUARIO: "USUARIO"  // pode mudar se quiser
    };

    try {
      const response = await fetch('http://localhost:4000/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
    const data = await response.json();
    // Redireciona para a página de login após o cadastro bem-sucedido
   window.location.href = "./login.html"; // Certifique-se de que o caminho está correto
} else {
    const errorData = await response.json();
    alert(`Erro ao cadastrar usuário: ${errorData.error || 'Erro desconhecido'}`);
}
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar com a API.');
    }
  });