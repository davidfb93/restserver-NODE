
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');



const getUsuarios = (req, res = response) => {
    const { q, nombre = 'no name' , apikey, page = 1, limit = 10 } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
    });
}

const putUsuarios = (req, res) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controlador',
        id
    });
}

const postUsuarios = async(req, res) => {
    
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }

    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        });
    }

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();
    
    res.json({
        usuario
    });
}

const deleteUsuarios = (req, res) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

const patchUsuarios = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    });
}


module.exports = {
    getUsuarios,
    putUsuarios,
    postUsuarios,
    deleteUsuarios,
    patchUsuarios
}