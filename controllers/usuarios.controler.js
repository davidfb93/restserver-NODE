
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const getUsuarios = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ totalUsuarios, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number(desde))
            .limit( Number(limite))
    ]);

    res.json({
        totalUsuarios,
        usuarios
    });
}

const putUsuarios = async(req, res) => {

    const id = req.params.id;
    const { _id, password, google, ...resto } = req.body;

    //TODO validar contra base de datos
    if (password) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Usuario actualizado con éxito',
        usuario
    });
}

const postUsuarios = async(req, res) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();
    
    res.json({
        msg: 'Usuario creado con éxito',
        usuario
    });
}

const deleteUsuarios = async(req, res) => {

    const { id } = req.params;

    const uid = req.uid

    //Borrar físicamente
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;

    res.json({ usuario, usuarioAutenticado });
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