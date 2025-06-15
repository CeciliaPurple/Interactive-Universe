document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const form = document.querySelector(".form");

    // Função para buscar dados do usuário
    async function buscarDadosUsuario() {
        try {
            console.log('Token que será enviado:', token);
            console.log('Headers que serão enviados:', {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            });

            const response = await fetch('http://localhost:4000/usuarios/perfil', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const userData = await response.json();
                console.log('Usuário:', userData);

                const nomeInput = document.getElementById("Nome");
                const emailInput = document.getElementById("Email");
                const senhaInput = document.getElementById("password");

                if (nomeInput) nomeInput.value = userData.NOME || '';
                if (emailInput) emailInput.value = userData.EMAIL || '';
                if (senhaInput) senhaInput.value = userData.SENHA || '';
            } else if (response.status === 401 || response.status === 403) {
                alert("Sessão expirada, faça login novamente.");
                localStorage.removeItem("token");
                window.location.href = 'login.html';
            } else {
                const errorData = await response.json();
                alert(`Erro ao buscar dados do usuário: ${errorData.error || "Erro desconhecido"}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao conectar à API.');
        }
    }

    // Função para atualizar dados do usuário
    async function atualizarDadosUsuario(event) {
        event.preventDefault();

        const nomeInput = document.getElementById('Nome');
        const emailInput = document.getElementById('Email');
        const senhaInput = document.getElementById('password');

        const nome = nomeInput ? nomeInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const senha = senhaInput ? senhaInput.value.trim() : '';

        const payload = {};
        if (nome) payload.NOME = nome;
        if (email) payload.EMAIL = email;
        if (senha) payload.SENHA = senha;

        try {
            const response = await fetch('http://localhost:4000/usuarios/perfil', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                showMessage('Dados atualizados com sucesso!', 'success');

                if (payload.NOME) {
                    localStorage.setItem("usuarioNome", payload.NOME);
                }
            } else if (response.status === 401 || response.status === 403) {
                alert('Sessão expirada. Faça login novamente.');
                localStorage.removeItem('token');
                window.location.href = 'login.html';
            } else {
                const errorData = await response.json();
                showMessage(`Erro ao atualizar dados: ${errorData.error || "Erro desconhecido"}`, 'error');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao conectar à API.');
        }
    }

    // Função para excluir conta do usuário
    function excluirConta() {
        if (confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
            fetch("http://localhost:4000/usuarios/perfil", {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
                .then(response => {
                    if (response.ok) {
                        showMessage("Conta excluída com sucesso.", "success");
                        localStorage.removeItem("token");
                        localStorage.removeItem("usuarioNome");
                        window.location.href = './index.html';
                    } else {
                        return response.json().then(errorData => {
                            throw new Error(errorData.error || "Erro ao excluir conta");
                        });
                    }
                })
                .catch(error => {
                    console.error('Erro ao excluir conta:', error);
                    showMessage("Conta excluída com sucesso.", "success");
                });
        }
    }

    // Adiciona eventos
    if (form) {
        form.addEventListener('submit', atualizarDadosUsuario);
    }

    const btnExcluir = document.querySelector('.login-button2');
    if (btnExcluir) {
        btnExcluir.addEventListener('click', function (event) {
            event.preventDefault();
            excluirConta();
        });
    }

    // Busca dados do usuário ao carregar a página
    buscarDadosUsuario();
});

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault(); // previne o comportamento padrão do botão submit

    localStorage.removeItem("token");
    localStorage.removeItem("usuarioNome");

    showMessage("Você saiu da conta com sucesso.", "success");

    // Depois de um tempo, redireciona para a página inicial/login
    setTimeout(() => {
      window.location.href = './index.html';
    }, 1500); // espera 1.5 segundos para a mensagem aparecer
  });
}


//função de mensagen 
function showMessage(text, type = 'success') {
  const messageDiv = document.getElementById('message');
  if (!messageDiv) return;

  messageDiv.textContent = text;
  messageDiv.className = 'message'; // reseta classes
  messageDiv.classList.add(type);
  messageDiv.style.display = 'block';

  // Opcional: esconde a mensagem depois de 4 segundos
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 4000);
}

