document.adddEvenListener('DOMContentLoaded',function(){
    const token = localStorage.getItem("token");
    if(!token){
        window.location.href = 'login.html';
    return;
    }

    const form = document.querySelector(".form")

    //função para buscar dados do usuario
    async function buscarDadosUsuario(){
        try {
            const response = await fetch('http:localhost:4000/usuarios/perfil', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        
            if (response.ok) {
                const userData = await response.json();
        
                document.getElementById("NOME").value = userData.NOME;
                document.getElementById("EMAIL").value = userData.EMAIL;
        
                // Não exibir a senha
                document.getElementById('SENHA').value = '';
            } else if (response.status === 401 || response.status === 403) {
                // Token expirado
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
    // Chama a função para atualizar os dados do usuário

    async function atalizarDadosUsuario(event) {
        event.preventDefault();

        const nome = document.getElementById('NOME').value.trim();
        const email = document.getElementById('EMAIL').value.trim();
        const senha = document.getElementById('SENHA').value.trim();

        //monta o payload apenas com os campos preenchidos
        const payload = {};
        if (nome) payload.NOME = nome;
          if (email) payload.NOME = email;
            if (senha) payload.NOME = senha;

            try{
                const response = await fetch('http://localhost:4000/usuarios/perfil', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });

                if(response.ok){
                    const data  = await response.json();
                    alert('Dados atualizados com sucesso!')

                    // atualiza o nome no localStorage se foi alterado
                    if(payload.NOME){
                        localStorage.setItem("usuarioNome",payload.NOME)
                    }else if(response.status === 401 || response.status === 403){
                        // Token expirado
                        alert('Sessão expirada. Faça login novamente.');
                        localStorage.removeItem('token');
                        window.location.href = 'login.html';
                    } else{
                        const errorData = await response.json();
                        alert(`Erro ao atualizar dados do usuário: ${errorData.error || "Erro desconhecido"}`);
                    }
                }

            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Erro ao conectar à API.');
            }
    }
    
});