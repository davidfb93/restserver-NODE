const Rol = require('../models/rol');
const { Usuario, Categoria, Producto} = require('../models');

const esRolValido = async( rol = '' ) => {
    const existeRol = await Rol.findOne({ rol });
    if ( !existeRol ) {
            throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo:  ${ correo } ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    //Verificar si el id existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id:  ${ id } no existe`);
    }
}

const existeCategoriaPorId = async( id ) => {

    //Verificar si la categoria existe
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id:  ${ id } no existe para ninguna categoria en la BD`);
    }
}

const existeProductoPorId = async( id ) => {

    //Verificar si la categoria existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id:  ${ id } no existe para ningún producto en la BD`);
    }
}




module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}
