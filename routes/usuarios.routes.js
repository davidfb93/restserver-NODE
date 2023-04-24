
const { Router } = require('express');
const { getUsuarios, 
        putUsuarios, 
        postUsuarios, 
        deleteUsuarios, 
        patchUsuarios } = require('../controllers/usuarios.controler');

const router = Router();

// Llamomos la referencia a la función desde el controlador
router.get('/', getUsuarios );

router.put('/:id', putUsuarios );

router.post('/', postUsuarios);

router.delete('/', deleteUsuarios);

router.patch('/', patchUsuarios);


module.exports = router;





