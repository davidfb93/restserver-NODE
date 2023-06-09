const { response, json } = require("express")
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {
        //? Verificar correo
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //? Verificar si es usuario activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        //? Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //? Generar JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }


}

const googleSignin = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify(id_token);

        //? Verificar si el correo existe en la base de datos
        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            //? Si no existe el usuario se crea
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                rol: 'USER_ROLE',
                google: true
            }

            usuario = new Usuario( data );
            await usuario.save();
        }

        //? Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Comuniquese con el administrador, usuario deshabilitado'
            })
        }

        //? Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: 'Token de Google no es válido'
        })
    }

}

module.exports = {
    login,
    googleSignin
}

