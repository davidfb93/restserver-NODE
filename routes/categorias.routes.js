const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

/***
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json({
        msg: 'get API - categorias'
    })
});

// Obtener una categoria por id - publico
router.get('/:id', (req, res) => {
    res.json({
        msg: 'get API - categorias por ID'
    })
});

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', (req, res) => {
    res.json({
        msg: 'post API - categorias'
    })
});

// Actualizar - privado - cualquier persona con un token valido
router.put('/:id', (req, res) => {
    res.json({
        msg: 'put API - categorias'
    })
});

// Borrar una categoria - Admin
router.delete('/:id', (req, res) => {
    res.json({
        msg: 'delete API - categorias'
    })
});

module.exports = router;
