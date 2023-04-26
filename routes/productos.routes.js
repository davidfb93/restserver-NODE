const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');
const { getProductos, 
        crearProducto,
        actualizarProducto,  
        eliminarProducto,
        getProducto} = require('../controllers/productos.controler');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');


const router = Router();

/***
 * {{url}}/api/productos
 */

// Obtener todas los productos - publico
router.get('/', getProductos)

// Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], getProducto)

// Crear producto - privado
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo válido').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto)

// Actualizar producto - privado
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto);

// Borrar un producto - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], eliminarProducto);

module.exports = router;
