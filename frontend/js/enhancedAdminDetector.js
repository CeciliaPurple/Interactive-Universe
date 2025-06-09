// enhanced-admin-detector.js - Versão aprimorada do detector de administrador

class EnhancedAdminDetector {
    constructor() {
        this.isAdmin = false;
        this.token = null;
        this.editMode = false;
        this.contentAPI = window.contentAPI || new ContentAPI();
        this.newsEditor = null;
        this.pageEditor = null;
        this.init();
    }

    async init() {
        await this.checkAdminStatus();
        this.setupEventListeners();
        this.initializeEditors();
    }

    // Verifica se o usuário é administrador
    async checkAdminStatus() {
        this.token = localStorage.getItem('token');
        
        if (!this.token) {
            this.isAdmin = false;
            return;
        }

        try {
            this.isAdmin = await this.contentAPI.isAdmin();
            
            if (this.isAdmin) {
                this.showAdminControls();
            }
        } catch (error) {
            console.error('Erro ao verificar status de administrador:', error);
            this.isAdmin = false;
        }
    }

    // Inicializa os editores específicos
    initializeEditors() {
        if (!this.isAdmin) return;

        // Inicializa editor de notícias se estiver na página index
        const isIndexPage = window.location.pathname === '/' || 
                           window.location.pathname.endsWith('index.html');
        
        if (isIndexPage && window.NewsEditor) {
            this.newsEditor = new NewsEditor();
        }

        // Inicializa editor de páginas
        if (window.PageEditor) {
            this.pageEditor = new PageEditor();
        }
    }

    // Configura listeners de eventos
    setupEventListeners() {
        // Listener para teclas de atalho
        document.addEventListener('keydown', (e) => {
            if (this.isAdmin && e.ctrlKey && e.key === 'e') {
                e.preventDefault();
                this.toggleEditMode();
            }
            
            if (this.isAdmin && this.editMode && e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.saveAllChanges();
            }
        });
    }

    // Mostra controles de administrador
    showAdminControls() {
        if (!this.isAdmin) return;

        // Cria botão de edição flutuante
        this.createEditButton();
        
        // Adiciona indicador visual para elementos editáveis
        this.markEditableElements();
        
        // Mostra indicador de status de administrador
        this.showAdminIndicator();
    }

    // Cria botão de edição flutuante
    createEditButton() {
        // Remove botão existente se houver
        const existingButton = document.getElementById('admin-edit-btn');
        if (existingButton) {
            existingButton.remove();
        }

        const editButton = document.createElement('div');
        editButton.id = 'admin-edit-btn';
        editButton.innerHTML = `
            <button id="toggle-edit-mode" class="admin-btn">
                <span class="edit-icon">✏️</span>
                <span class="edit-text">Editar</span>
            </button>
            <div class="admin-tooltip">Ctrl+E para editar</div>
        `;
        
        // Estilos do botão
        editButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            background: rgba(187, 134, 252, 0.9);
            border-radius: 50px;
            padding: 5px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
        `;

        const button = editButton.querySelector('#toggle-edit-mode');
        button.style.cssText = `
            background: transparent;
            border: none;
            color: white;
            padding: 10px 15px;
            border-radius: 45px;
            cursor: pointer;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        `;

        const tooltip = editButton.querySelector('.admin-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            bottom: -30px;
            right: 0;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;

        // Mostra tooltip no hover
        button.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
        });

        button.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });

        // Adiciona evento de clique
        button.addEventListener('click', () => this.toggleEditMode());
        
        document.body.appendChild(editButton);
    }

    // Mostra indicador de status de administrador
    showAdminIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'admin-indicator';
        indicator.innerHTML = '👑 ADM';
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 9998;
            background: rgba(3, 218, 198, 0.9);
            color: black;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(indicator);
    }

    // Marca elementos editáveis
    markEditableElements() {
        if (!this.isAdmin) return;

        const editableSelectors = [
            '.noticia-titulo',
            '.noticia-sub-titulo', 
            '.noticia-texto',
            '.title',
            '.text',
            '.text2',
            '.text3'
        ];

        editableSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add('admin-editable');
                if (!element.getAttribute('data-original-content')) {
                    element.setAttribute('data-original-content', element.innerHTML);
                }
            });
        });
    }

    // Alterna modo de edição
    toggleEditMode() {
        this.editMode = !this.editMode;
        const button = document.querySelector('#toggle-edit-mode');
        const editText = button.querySelector('.edit-text');
        const editIcon = button.querySelector('.edit-icon');

        if (this.editMode) {
            this.enableEditMode();
            editText.textContent = 'Salvar';
            editIcon.textContent = '💾';
            button.style.background = 'rgba(3, 218, 198, 0.8)';
        } else {
            this.disableEditMode();
            editText.textContent = 'Editar';
            editIcon.textContent = '✏️';
            button.style.background = 'transparent';
        }
    }

    // Ativa modo de edição
    enableEditMode() {
        const editableElements = document.querySelectorAll('.admin-editable');
        
        editableElements.forEach(element => {
            // Adiciona borda e cursor para indicar que é editável
            element.style.cssText += `
                border: 2px dashed #BB86FC !important;
                cursor: text !important;
                padding: 5px !important;
                border-radius: 4px !important;
                transition: all 0.3s ease !important;
                position: relative !important;
            `;
            
            // Torna o elemento editável
            element.contentEditable = true;
            
            // Adiciona eventos
            element.addEventListener('focus', this.onElementFocus);
            element.addEventListener('blur', this.onElementBlur);
            element.addEventListener('input', this.onElementInput);
            
            // Adiciona indicador de edição
            this.addEditIndicator(element);
        });

        // Mostra mensagem de instrução
        this.showEditInstructions();
    }

    // Adiciona indicador visual de edição
    addEditIndicator(element) {
        const indicator = document.createElement('div');
        indicator.className = 'edit-indicator';
        indicator.innerHTML = '✏️';
        indicator.style.cssText = `
            position: absolute;
            top: -10px;
            right: -10px;
            background: #BB86FC;
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.appendChild(indicator);
    }

    // Desativa modo de edição
    disableEditMode() {
        const editableElements = document.querySelectorAll('.admin-editable');
        
        editableElements.forEach(element => {
            element.contentEditable = false;
            element.style.border = '';
            element.style.cursor = '';
            element.style.padding = '';
            element.style.borderRadius = '';
            
            // Remove eventos
            element.removeEventListener('focus', this.onElementFocus);
            element.removeEventListener('blur', this.onElementBlur);
            element.removeEventListener('input', this.onElementInput);
            
            // Remove indicador de edição
            const indicator = element.querySelector('.edit-indicator');
            if (indicator) {
                indicator.remove();
            }
        });

        // Remove instruções
        this.hideEditInstructions();
        
        // Salva alterações
        this.saveAllChanges();
    }

    // Eventos de elementos editáveis
    onElementFocus = (event) => {
        event.target.style.background = 'rgba(187, 134, 252, 0.1)';
    }

    onElementBlur = (event) => {
        event.target.style.background = '';
    }

    onElementInput = (event) => {
        // Marca elemento como modificado
        event.target.setAttribute('data-modified', 'true');
        
        // Atualiza indicador visual
        const indicator = event.target.querySelector('.edit-indicator');
        if (indicator) {
            indicator.innerHTML = '💾';
            indicator.style.background = '#03DAC6';
        }
    }

    // Mostra instruções de edição
    showEditInstructions() {
        const instructions = document.createElement('div');
        instructions.id = 'edit-instructions';
        instructions.innerHTML = `
            <div class="instruction-content">
                <p>🎯 <strong>Modo de Edição Ativo</strong></p>
                <p>• Clique nos textos com borda pontilhada para editar</p>
                <p>• Ctrl+S para salvar rapidamente</p>
                <p>• Clique em "Salvar" quando terminar</p>
            </div>
        `;
        
        instructions.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 9998;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            max-width: 280px;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            border-left: 4px solid #BB86FC;
        `;

        document.body.appendChild(instructions);

        // Remove automaticamente após 8 segundos
        setTimeout(() => {
            if (instructions.parentNode) {
                instructions.remove();
            }
        }, 8000);
    }

    // Esconde instruções
    hideEditInstructions() {
        const instructions = document.getElementById('edit-instructions');
        if (instructions) {
            instructions.remove();
        }
    }

    // Salva todas as alterações
    async saveAllChanges() {
        const modifiedElements = document.querySelectorAll('[data-modified="true"]');
        
        if (modifiedElements.length === 0) {
            return;
        }

        try {
            // Mostra indicador de salvamento
            this.showSaveIndicator();

            // Salva alterações de notícias se houver
            if (this.newsEditor) {
                await this.newsEditor.saveNewsChanges();
            }

            // Salva alterações de páginas se houver
            if (this.pageEditor) {
                await this.pageEditor.savePageChanges();
            }

            this.showSuccessMessage();

        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
            this.showErrorMessage();
        }
    }

    // Mostra indicador de salvamento
    showSaveIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'save-indicator';
        indicator.innerHTML = '💾 Salvando...';
        indicator.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px 30px;
            border-radius: 8px;
            font-weight: bold;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;
        document.body.appendChild(indicator);
    }

    // Mostra mensagem de sucesso
    showSuccessMessage() {
        const indicator = document.getElementById('save-indicator');
        if (indicator) {
            indicator.innerHTML = '✅ Salvo com sucesso!';
            indicator.style.background = 'rgba(40, 167, 69, 0.9)';
            setTimeout(() => indicator.remove(), 2000);
        }
    }

    // Mostra mensagem de erro
    showErrorMessage() {
        const indicator = document.getElementById('save-indicator');
        if (indicator) {
            indicator.innerHTML = '❌ Erro ao salvar';
            indicator.style.background = 'rgba(220, 53, 69, 0.9)';
            setTimeout(() => indicator.remove(), 3000);
        }
    }

    // Método para obter estatísticas de edição
    getEditingStats() {
        const totalEditable = document.querySelectorAll('.admin-editable').length;
        const modified = document.querySelectorAll('[data-modified="true"]').length;
        
        return {
            isAdmin: this.isAdmin,
            editMode: this.editMode,
            totalEditable,
            modified,
            hasChanges: modified > 0
        };
    }
}

// Inicializa o detector de administrador aprimorado quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    window.enhancedAdminDetector = new EnhancedAdminDetector();
});

// Exporta para uso em outros scripts se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedAdminDetector;
}

