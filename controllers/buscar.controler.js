const { response } = require("express");
const { isValidObjectId } = require("mongoose");

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios',
];

const buscarUsarios = async (termino = '', res = response) => {

    const esMongoID = isValidObjectId(termino); // true

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }


    
}




const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch ( coleccion ) {
        case 'usuarios':
            buscarUsarios(termino, res)
            break;
        case 'categorias':
            break;
        case 'productos':
            break;
        default:
            res.status(500).json({
                msg: 'Esta busqueda no esta implementada'
            })
            break;
    }


}

module.exports = {
    buscar
}