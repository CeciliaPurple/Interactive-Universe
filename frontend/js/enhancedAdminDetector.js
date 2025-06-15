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
    // Alterna modo de edição

}