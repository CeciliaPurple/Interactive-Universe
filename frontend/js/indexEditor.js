// indexEditor.js - Implementação específica para a página index.html

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o detector de administrador já foi inicializado
    if (!window.adminDetector) {
        window.adminDetector = new AdminDetector();
    }

    // Configurações específicas para a página index
    setupIndexEditorHandlers();
});

// Configura manipuladores específicos para a página index
function setupIndexEditorHandlers() {
    // Adiciona manipuladores de salvamento específicos para a página index
    if (window.adminDetector && window.adminDetector.isAdmin) {
        // Sobrescreve o método de salvamento para a página index
        const originalSaveMethod = window.adminDetector.saveChanges;
        
        window.adminDetector.saveChanges = async function() {
            const modifiedElements = document.querySelectorAll('[data-modified="true"]');
            
            if (modifiedElements.length === 0) {
                return;
            }

            try {
                // Mostra indicador de salvamento
                this.showSaveIndicator();

                // Coleta as alterações
                const changes = Array.from(modifiedElements).map(element => {
                    // Identifica qual seção da página foi modificada
                    let section = 'geral';
                    
                    if (element.closest('.noticia1')) {
                        section = 'eclipse';
                    } else if (element.closest('.noticia2')) {
                        section = 'nebulosa';
                    }
                    
                    return {
                        selector: this.getElementSelector(element),
                        content: element.innerHTML,
                        section: section,
                        page: 'index'
                    };
                });

                console.log('Alterações a serem salvas na página index:', changes);

                // Aqui você implementaria a chamada à API para salvar as alterações
                // Por exemplo:
                // await fetch('http://localhost:4000/conteudo/atualizar', {
                //     method: 'PUT',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': `Bearer ${this.token}`
                //     },
                //     body: JSON.stringify({ changes })
                // });

                // Simula salvamento (substitua pela sua API)
                await this.simulateSave(changes);

                // Remove marcação de modificado
                modifiedElements.forEach(element => {
                    element.removeAttribute('data-modified');
                    element.setAttribute('data-original-content', element.innerHTML);
                });

                this.showSuccessMessage();

            } catch (error) {
                console.error('Erro ao salvar alterações na página index:', error);
                this.showErrorMessage();
            }
        };
    }
}

