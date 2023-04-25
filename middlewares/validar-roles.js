const { response } = require("express")


const esAdminRol = (req, res = response, next) => {

    if( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario

    if ( rol !== 'ADMIN_ROL' ) {
        return res.status(401).json({
            msg: `El usuario ${ nombre } no es administrador - No tiene permisos para realizar esta petición`
        });
    }

    next();
}

const tieneRol = ( ...roles ) => {

    
    return (req, res = response, next) => {

        if( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }

        next();
    }
}


module.exports = {
    esAdminRol,
    tieneRol
}
