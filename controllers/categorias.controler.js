const { response } = require("express")
const { Categoria } = require('../models')

const getCategorias = async( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
            .populate( 'usuario', 'nombre')
            .skip( Number(desde))
            .limit( Number(limite))
    ]);

    res.json({
        total,
        categorias
    });

}

const getCategoriaById = async( req, res = response ) => {

    const { id } = req.params;
    const categoria = await Categoria.findById( id ).populate( 'usuario', 'nombre' );

    res.json( categoria );

}

const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    // Generar data a guardar
    const data = {
        nombre, 
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json({
        msg: 'Categoria guardada con exito',
        categoria
    })

}

const actualizarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true } );

    res.json( categoria );

    
}

const eliminarCategoria = async (req, res = response) => {

    const { id } = req.params; 
    const categoriaEliminada = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.status(200).json( categoriaEliminada );

}



module.exports = {
    crearCategoria,
    getCategorias,
    getCategoriaById,
    actualizarCategoria,
    eliminarCategoria
}