const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads.controler');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

//subir archivos
router.post('/', validarArchivoSubir ,cargarArchivo);

//actualizar imagen de usuario
router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagen )



module.exports = router;
