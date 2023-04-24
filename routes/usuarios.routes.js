
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { getUsuarios, 
        putUsuarios, 
        postUsuarios, 
        deleteUsuarios, 
        patchUsuarios } = require('../controllers/usuarios.controler');

const router = Router();

// Llamomos la referencia a la función desde el controlador
router.get('/', getUsuarios );

router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('rol').custom( esRolValido ),
        validarCampos
],putUsuarios );

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser de mayor a  6 caracteres').isLength({ min: 6 }),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( emailExiste ),
        //check('rol', 'No es un rol válido').isIn(['ADMIN_ROL', 'USER_ROL']),
        check('rol').custom( esRolValido ),
        validarCampos
] ,postUsuarios);

router.delete('/:id',[
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
] ,deleteUsuarios);

router.patch('/', patchUsuarios);

module.exports = router;





