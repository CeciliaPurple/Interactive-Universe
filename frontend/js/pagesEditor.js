class PageEditor extends BaseEditor {
    constructor() {
        super('page-editable');
        this.contentAPI = window.contentAPI || new ContentAPI();
        this.currentPage = this.detectPage();
        this.editableSelectors = this.getEditableSelectors();
        this.init();
    }

    async init() {
        const isAdmin = await this.contentAPI.isAdmin();
        if (!isAdmin) return;
        this.setupEditing();
    }

    detectPage() {
        const path = location.pathname;
        if (path.includes('eclipse.html')) return 'eclipse';
        if (path.includes('nebulosa.html')) return 'nebulosa';
        if (path === '/' || path.includes('index.html')) return 'index';
        return 'unknown';
    }

    getEditableSelectors() {
        switch (this.currentPage) {
            case 'eclipse':
            case 'nebulosa':
                return ['.title', '.text', '.text2', '.text3'];
            case 'index':
                return ['.noticia-titulo', '.noticia-sub-titulo', '.noticia-texto'];
            default:
                return [];
        }
    }

    setupEditing() {
        this.editableSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                if (!el.hasAttribute('data-original-content')) {
                    el.setAttribute('data-page', this.currentPage);
                    el.setAttribute('data-section', this.identifySection(el));
                    el.setAttribute('data-content-type', this.identifyContentType(el));
                    el.setAttribute('data-original-content', el.innerHTML.trim());
                    this.enableEditing(el);
                }
            });
        });
    }

    identifySection(el) {
        if (el.closest('.info')) return 'info1';
        if (el.closest('.info2')) return 'info2';
        if (el.closest('.info3')) return 'info3';
        if (el.closest('.container')) return 'header'; // Corrigido de .cotainer para .container
        if (el.closest('.noticia1')) return 'eclipse';
        if (el.closest('.noticia2')) return 'nebulosa';
        return 'geral';
    }

    identifyContentType(el) {
        const classList = el.classList;
        if (classList.contains('title')) return 'titulo';
        if (classList.contains('text')) return 'texto1';
        if (classList.contains('text2')) return 'texto2';
        if (classList.contains('text3')) return 'texto3';
        if (classList.contains('noticia-titulo')) return 'titulo';
        if (classList.contains('noticia-sub-titulo')) return 'subtitulo';
        if (classList.contains('noticia-texto')) return 'texto';
        return 'conteudo';
    }

    async savePageChanges() {
        const modifiedElements = this.getModifiedElements();
        if (modifiedElements.length === 0) return;

        const changesBySection = {};

        modifiedElements.forEach(el => {
            const section = el.getAttribute('data-section');
            const type = el.getAttribute('data-content-type');
            const content = el.innerHTML.trim();

            if (!changesBySection[section]) changesBySection[section] = {};
            changesBySection[section][type] = content;
        });

        console.log(`Salvando conteúdo da página '${this.currentPage}':`, changesBySection);
        await this.contentAPI.updatePageContent(this.currentPage, changesBySection);

        modifiedElements.forEach(el => {
            el.removeAttribute('data-modified');
            el.setAttribute('data-original-content', el.innerHTML.trim());
        });

        return true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const editablePages = ['eclipse.html', 'nebulosa.html', 'index.html'];
    const path = location.pathname;

    if (editablePages.some(page => path.includes(page) || (page === 'index.html' && path === '/'))) {
        if (!window.pageEditor) {
            window.pageEditor = new PageEditor();
        }

        window.addEventListener('beforeunload', e => {
            if (window.pageEditor?.hasUnsavedChanges()) {
                e.preventDefault();
                e.returnValue = 'Você tem alterações não salvas. Deseja realmente sair?';
            }
        });
    }
});

// Suporte a Node.js (testes ou SSR)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageEditor;
}
