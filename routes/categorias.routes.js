const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');
const { crearCategoria, 
        getCategorias, 
        getCategoriaById, 
        actualizarCategoria,  
        eliminarCategoria} = require('../controllers/categorias.controler');
const { existeCategoriaPorId } = require('../helpers/db-validators');


const router = Router();

/***
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/', getCategorias);

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], getCategoriaById );

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] , crearCategoria);

// Actualizar - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
] ,actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
] ,eliminarCategoria);

module.exports = router;
