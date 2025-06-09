const fs = require('fs').promises;
const path = require('path');

const ConteudoController = {
    // Atualizar conteúdo de página
    async atualizarConteudo(req, res) {
        try {
            const { page, changes } = req.body;
            
            // Verifica se o usuário é administrador
            if (req.user.TIPO !== 'ADM') {
                return res.status(403).json({ 
                    error: 'Apenas administradores podem atualizar conteúdo.' 
                });
            }
            
            // Valida os dados de entrada
            if (!page || !changes) {
                return res.status(400).json({ 
                    error: 'Página e alterações são obrigatórias.' 
                });
            }
            
            // Cria objeto com dados da alteração
            const contentData = {
                page,
                changes,
                updatedAt: new Date(),
                updatedBy: req.user.ID,
                userEmail: req.user.EMAIL
            };
            
            // Salva as alterações
            await this.saveContentChanges(contentData);
            
            // Log da operação
            console.log(`Conteúdo da página ${page} atualizado por ${req.user.EMAIL}`);
            
            res.json({ 
                success: true, 
                message: `Conteúdo da página ${page} atualizado com sucesso`,
                changes,
                timestamp: contentData.updatedAt
            });
        } catch (error) {
            console.error('Erro ao atualizar conteúdo:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },
    
    // Obter histórico de alterações
    async obterHistorico(req, res) {
        try {
            // Verifica se o usuário é administrador
            if (req.user.TIPO !== 'ADM') {
                return res.status(403).json({ 
                    error: 'Apenas administradores podem ver o histórico.' 
                });
            }
            
            const { page } = req.params;
            const historico = await this.getContentHistory(page);
            
            res.json({ 
                success: true, 
                page,
                historico 
            });
        } catch (error) {
            console.error('Erro ao obter histórico:', error);
            res.status(500).json({ error: 'Erro ao obter histórico' });
        }
    },
    
    // Salvar alterações em arquivo JSON
    async saveContentChanges(contentData) {
        const dataDir = path.join(__dirname, '../data');
        const filePath = path.join(dataDir, 'content-changes.json');
        
        try {
            // Cria diretório se não existir
            await fs.mkdir(dataDir, { recursive: true });
            
            let existingData = [];
            try {
                const fileContent = await fs.readFile(filePath, 'utf8');
                existingData = JSON.parse(fileContent);
            } catch (error) {
                // Arquivo não existe ainda, começar com array vazio
            }
            
            // Adiciona nova alteração
            existingData.push(contentData);
            
            // Mantém apenas os últimos 1000 registros
            if (existingData.length > 1000) {
                existingData = existingData.slice(-1000);
            }
            
            // Salva arquivo
            await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));
            
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
            throw error;
        }
    },
    
    // Obter histórico de alterações
    async getContentHistory(page) {
        const filePath = path.join(__dirname, '../data/content-changes.json');
        
        try {
            const fileContent = await fs.readFile(filePath, 'utf8');
            const allChanges = JSON.parse(fileContent);
            
            // Filtra por página se especificada
            if (page) {
                return allChanges.filter(change => change.page === page);
            }
            
            return allChanges;
        } catch (error) {
            console.error('Erro ao ler histórico:', error);
            return [];
        }
    },
    
    // Restaurar versão anterior
    async restaurarVersao(req, res) {
        try {
            const { page, timestamp } = req.body;
            
            // Verifica se o usuário é administrador
            if (req.user.TIPO !== 'ADM') {
                return res.status(403).json({ 
                    error: 'Apenas administradores podem restaurar versões.' 
                });
            }
            
            const historico = await this.getContentHistory(page);
            const versao = historico.find(h => h.updatedAt === timestamp);
            
            if (!versao) {
                return res.status(404).json({ 
                    error: 'Versão não encontrada.' 
                });
            }
            
            // Cria nova entrada de restauração
            const restoreData = {
                page,
                changes: versao.changes,
                updatedAt: new Date(),
                updatedBy: req.user.ID,
                userEmail: req.user.EMAIL,
                action: 'restore',
                restoredFrom: timestamp
            };
            
            await this.saveContentChanges(restoreData);
            
            res.json({ 
                success: true, 
                message: 'Versão restaurada com sucesso',
                changes: versao.changes
            });
            
        } catch (error) {
            console.error('Erro ao restaurar versão:', error);
            res.status(500).json({ error: 'Erro ao restaurar versão' });
        }
    }
};

module.exports = ConteudoController;