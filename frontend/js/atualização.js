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
            const response = await fetch('your-api-endpoint', {
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
    
});