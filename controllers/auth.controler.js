const { response } = require("express")
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario')

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
        //?Verificar correo
        const usuario = await Usuario.findOne({ correo });  
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //?Verificar si es usuario activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        //?Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //?Generar JWT


        res.json({
            msg: 'login ok',
        })        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }


}


module.exports = {
    login,

}

