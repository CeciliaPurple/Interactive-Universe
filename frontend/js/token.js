// Verifica se o token está presente no localStorage
const token = localStorage.getItem("token");

// Seleciona o elemento de login original
const loginLabel = document.querySelector(".login");

if (token && loginLabel) {
  // Se o token existir, substitui TODA a <label class="login"> pela imagem/link do usuário.
  // Isso remove o botão/menu suspenso original.
  loginLabel.outerHTML = `
<a href="atualização.html">
  <img src="img/usuário-64.png" alt="Usuário" class="login1";" />
</a>
`;
}
// Se o token NÃO existir, o script não faz nada, e a <label class="login"> original
// (com o input checkbox e o menu suspenso) permanece no HTML. A funcionalidade do
// menu suspenso deve depender do seu CSS original associado à classe .login e ao input checkbox.
