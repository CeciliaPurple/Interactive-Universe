// content-api.js - API para gerenciamento de conteúdo

class ContentAPI {
    constructor(baseUrl = 'http://localhost:4000') {
        this.baseUrl = baseUrl;
        this.endpoints = {
            noticias: '/noticias',
            conteudo: '/conteudo'
        };
    }

    // Obtém token de autenticação
    getAuthToken() {
        return localStorage.getItem('token');
    }

    // Obtém headers de autenticação
    getAuthHeaders() {
        const token = this.getAuthToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    // Verifica se o usuário é administrador
    async isAdmin() {
        const token = this.getAuthToken();
        if (!token) return false;

        try {
            // Decodifica o token JWT para verificar o tipo de usuário
            const payload = this.decodeJWT(token);
            return payload.TIPO === 'ADM';
        } catch (error) {
            console.error('Erro ao verificar status de administrador:', error);
            return false;
        }
    }

    // Decodifica JWT (apenas a parte do payload)
    decodeJWT(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (error) {
            throw new Error('Token inválido');
        }
    }

    // Cria uma nova notícia
    async createNews(data) {
        try {
            const response = await fetch(`${this.baseUrl}${this.endpoints.noticias}`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Erro ao criar notícia: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro na API:', error);
            throw error;
        }
    }

    // Atualiza conteúdo de notícia
    async updateNewsContent(id, data) {
        try {
            const response = await fetch(`${this.baseUrl}${this.endpoints.noticias}/${id}`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Erro ao atualizar notícia: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro na API:', error);
            throw error;
        }
    }

    // Atualiza conteúdo de página
    async updatePageContent(page, changes) {
        try {
            // Esta é uma implementação simulada
            // Na implementação real, você precisaria criar um endpoint no backend
            // para salvar as alterações de conteúdo das páginas
            
            console.log(`Atualizando conteúdo da página ${page}:`, changes);
            
            // Simula uma chamada de API bem-sucedida
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        success: true,
                        message: `Conteúdo da página ${page} atualizado com sucesso`,
                        changes
                    });
                }, 1000);
            });
            
            /*
            // Implementação real seria algo como:
            const response = await fetch(`${this.baseUrl}${this.endpoints.conteudo}`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ page, changes })
            });

            if (!response.ok) {
                throw new Error(`Erro ao atualizar conteúdo: ${response.status}`);
            }

            return await response.json();
            */
        } catch (error) {
            console.error('Erro na API:', error);
            throw error;
        }
    }

    // Obtém conteúdo de notícia
    async getNewsContent(id) {
        try {
            const response = await fetch(`${this.baseUrl}${this.endpoints.noticias}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao obter notícia: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro na API:', error);
            throw error;
        }
    }

    // Obtém todas as notícias
    async getAllNews() {
        try {
            const response = await fetch(`${this.baseUrl}${this.endpoints.noticias}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao obter notícias: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro na API:', error);
            throw error;
        }
    }
}

// Exporta a classe para uso global
window.ContentAPI = ContentAPI;

// Cria uma instância global para uso em outros scripts
window.contentAPI = new ContentAPI();

// Exporta para uso em módulos se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentAPI;
}
