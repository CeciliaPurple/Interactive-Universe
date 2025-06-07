const Noticia = require('../Models/noticiaModel');

//lListar noticias

exports.listarNoticias = async (req, res) => {
    try {
        const tipo = req.query.tipo;

        let filtro = {};
        if (tipo) {
            filtro.TIPO = tipo;
        }

        const noticias = await Noticia.findall({
            where: filtro,
            order: [['DATA_PUBLICACAO', 'DESC']]
        });

        return res.status(200).json(noticias);

    } catch (error) {
        console.error('Erro ao listar notícias:', error);
        return res.status(500).json({ error: 'Erro ao listar notícias' });
    }

}

// Obter uma notícia específica
exports.obterNoticia = async (req, res) => {
    try{
        const id = req.params.id;
        const noticia = await Noticia.findByPk(id);

        if (!noticia) {
            return res.status(404).json({ error: 'Notícia não encontrada' });
        }

        return res.status(200).json(noticia);
    } catch (error) {
        console.error('Erro ao obter notícia:', error);
        return res.status(500).json({ error: 'Erro ao obter notícia' });
    }
};

// Criar uma nova notícia
exportscriarNoticia = async (req,res) =>{
    try{
        const {TITULO, SUBTITULO, DESCRICAO1 , CONTEUDO, FOTO_CAPA, AUTOR_ID, DATA_PUBLICACAO} = req.body;
        //validações basicas
        if(!TITULO || !CONTEUDO || !TIPO){
            return res.status(400).json({mensage:'Titulo, conteúdo e tipo são obrigatórios.'});
        }

        //validar o tipo
        if(TIPO !== 'NEBULOSA' && TIPO !== 'ECLIPSE') {
            return res.status(400).json({mensage:'Tipo inválido. Deve ser NEBULOSA ou ECLIPSE.'});
        }

        const novaNoticia = await Noticia.create({
            TITULO,
            SUBTITULO,
            DESCRICAO1,
            CONTEUDO,
            FOTO_CAPA,
            AUTOR_ID,
            DATA_PUBLICACAO
        });

        return res.status(201).json({
            message: 'Notícia criada com sucesso',
            noticia: novaNoticia
        });

    } catch (error) {
        console.error('Erro ao criar notícia:', error);
        return res.status(500).json({ error: 'Erro ao criar notícia' });
    }
}


// Atualizar uma notícia existente
exports.atualizarNoticia = async (req,res) =>{
    try {
        const id = req.params;

        const { TITULO, SUBTITULO, DESCRICAO1, CONTEUDO, FOTO_CAPA, AUTOR_ID, DATA_PUBLICACAO } = req.body;

        const noticia = await Noticia.findByPk(id);
        if(!noticia){
            return res.status(404).json({mensage: 'Notícia não encontrada.'});
        }

        //validar o tipo se estiver sendo atualizado
        if(TIPO && TIPO !== 'NEBULOSA' && TIPO!== 'ECLIPSE') {
return res.status(400).json({mensage:'Tipo inválido. Deve ser NEBULOSA ou ECLIPSE.'});
        }

        //atualizar os campos da notícia

        await noticia.update({
            TITULO: TITULO || noticia.TITULO,
            SUBTITULO: SUBTITULO !== undefined ? SUBTITULO : noticia.SUBTITULO,
            DESCRICAO1: DESCRICAO1 || noticia.DESCRICAO1,  
            CONTEUDO: CONTEUDO || noticia.CONTEUDO,
            FOTO_CAPA: FOTO_CAPA || noticia.FOTO_CAPA,
            AUTOR_ID: AUTOR_ID || noticia.AUTOR_ID,
            DATA_PUBLICACAO: DATA_PUBLICACAO || noticia.DATA_PUBLICACAO
        });

        return res.status(200).json({
            message: 'Notícia atualizada com sucesso',
            noticia
        });
    }catch (error) {
        console.error('Erro ao atualizar notícia:', error);
        return res.status(500).json({ error: 'Erro ao atualizar notícia' });
    }
};

// excluir uma noticia
exports.excluirNoticia = async (req,res) =>{
    try{
        const id = req.params.id;

        const noticia = await Noticia.findByPk(id);
        if(!noticia){
            return res.status(404).json({ message: 'Notícia não encontrada.' });
        }

        await noticia.destroy();
        return res.status(200).json({ message: 'Notícia excluída com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir notícia:', error);
        return res.status(500).json({ error: 'Erro ao excluir notícia' });
    }
};

