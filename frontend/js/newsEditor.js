    class NewsEditor extends BaseEditor {
        constructor() {
            super('news-editable');
            this.contentAPI = window.contentAPI || new ContentAPI();
            this.editableSelectors = [
                '.noticia-titulo',
                '.noticia-sub-titulo',
                '.noticia-texto'
            ];
            this.init();
        }

        async init() {
            const isAdmin = await this.contentAPI.isAdmin();
            if (!isAdmin) return;

            this.setupEditing();
            this.setupCreateButton();
        }

        setupEditing() {
            const newsElements = document.querySelectorAll('.noticia1, .noticia2');

            newsElements.forEach(newsEl => {
                const newsId = newsEl.classList.contains('noticia1') ? 'eclipse' :
                            newsEl.classList.contains('noticia2') ? 'nebulosa' : null;

                if (!newsId) return;
                newsEl.setAttribute('data-news-id', newsId);

                this.editableSelectors.forEach(selector => {
                    const targets = newsEl.querySelectorAll(selector);
                    targets.forEach(el => {
                        el.setAttribute('data-news-id', newsId);
                        el.setAttribute('data-content-type', this.getContentType(el));
                        this.enableEditing(el);
                    });
                });
            });
        }

        getContentType(element) {
            if (element.classList.contains('noticia-titulo')) return 'TITULO';
            if (element.classList.contains('noticia-sub-titulo')) return 'SUB_TITULO';
            if (element.classList.contains('noticia-texto')) return 'DESCRICAO1';
            return 'CONTEUDO';
        }

        async saveNewsChanges() {
            const modifiedElements = this.getModifiedElements();
            if (modifiedElements.length === 0) return;

            const groupedChanges = {};

            modifiedElements.forEach(el => {
                const id = el.getAttribute('data-news-id');
                const type = el.getAttribute('data-content-type');
                const content = el.innerHTML;

                if (!groupedChanges[id]) groupedChanges[id] = {};
                groupedChanges[id][type] = content;
            });

            for (const [newsId, changes] of Object.entries(groupedChanges)) {
                console.log(`Salvando notícia "${newsId}":`, changes);

                await this.contentAPI.updateNewsContent(newsId, changes);

                modifiedElements.forEach(el => {
                    if (el.getAttribute('data-news-id') === newsId) {
                        el.removeAttribute('data-modified');
                        el.setAttribute('data-original-content', el.innerHTML);
                    }
                });
            }

            return true;
        }

        setupCreateButton() {
            // Verifica se o botão existe na página
            let createBtn = document.querySelector('#btn-create-news');
            if (!createBtn) {
                // Se não existir, cria e adiciona no body
                createBtn = document.createElement('button');
                createBtn.id = 'btn-create-news';
                createBtn.textContent = '+ Criar notícia';
                createBtn.style.position = 'fixed';
                createBtn.style.bottom = '20px';
                createBtn.style.right = '20px';
                createBtn.style.padding = '10px 20px';
                createBtn.style.fontWeight = 'bold';
                createBtn.style.zIndex = '1000';
                document.body.appendChild(createBtn);
            }

            createBtn.addEventListener('click', () => this.openCreateForm());
        }

        openCreateForm() {
            // Remove form se já existir
            const existingForm = document.querySelector('#news-create-form');
            if (existingForm) existingForm.remove();

            // Cria o HTML do formulário
            const formHtml = `
                <div id="news-create-form" style="position:fixed; top:50px; right:50px; background:#fff; padding:20px; border:1px solid #ccc; z-index:1001; width:300px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                    <h3>Criar nova notícia</h3>
                    <label>Título:<br><input type="text" id="new-title" style="width:100%;" /></label><br><br>
                    <label>Subtítulo:<br><input type="text" id="new-subtitle" style="width:100%;" /></label><br><br>
                    <label>Descrição:<br><textarea id="new-description" rows="3" style="width:100%;"></textarea></label><br><br>
                    <label>Conteúdo:<br><textarea id="new-content" rows="5" style="width:100%;"></textarea></label><br><br>
                    <button id="save-new-news" style="margin-right:10px;">Salvar</button>
                    <button id="cancel-new-news">Cancelar</button>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', formHtml);

            document.querySelector('#cancel-new-news').addEventListener('click', () => {
                document.querySelector('#news-create-form').remove();
            });

            document.querySelector('#save-new-news').addEventListener('click', async () => {
                const title = document.querySelector('#new-title').value.trim();
                const subtitle = document.querySelector('#new-subtitle').value.trim();
                const description = document.querySelector('#new-description').value.trim();
                const content = document.querySelector('#new-content').value.trim();

                if (!title) {
                    alert('Título é obrigatório');
                    return;
                }

                try {
                    const novaNoticia = await this.contentAPI.createNews({
                        TITULO: title,
                        SUB_TITULO: subtitle,
                        DESCRICAO1: description,
                        CONTEUDO: content,
                        DATA_PUBLICACAO: new Date().toISOString().slice(0, 10),
                    });

                    alert('Notícia criada com sucesso!');

                    document.querySelector('#news-create-form').remove();

                    // Atualiza a página para mostrar a nova notícia
                    location.reload();

                } catch (error) {
                    alert('Erro ao criar notícia: ' + error.message);
                }
            });
        }
    }
