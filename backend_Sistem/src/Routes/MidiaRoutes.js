const express = require('express');
const router = express.Router();
const MidiasController = require('../Controllers/MidiasController');

// Rotas CRUD
router.get('/', MidiasController.index);         // Listar todas
router.get('/:id', MidiasController.show);       // Ver uma
router.post('/', MidiasController.store);        // Criar
router.put('/:id', MidiasController.update);     // Atualizar
router.delete('/:id', MidiasController.destroy); // Deletar

module.exports = router;
