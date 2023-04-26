const path = require('path');
const { v4: uuidv4 } = require('uuid');

const extensiones_imagenes = ['png', 'jpg', 'jpeg', 'gif'];


const subirArchivo = ( files , extensionesValidas = extensiones_imagenes, carpeta = '' ) => {

    return new Promise( (resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
    
        // Validar extension
        if ( !extensionesValidas.includes( extensionArchivo ) ) {
            return reject (`La extensión ${ extensionArchivo } no es permitida, las permitidas son ${ extensionesValidas }`)
        }
    
        const nombreTemp = uuidv4() + '.' + extensionArchivo;
        const uploadPath = path.join( __dirname , '../uploads/' , carpeta, nombreTemp);
    
        archivo.mv(uploadPath,  (err) => {
            if (err) {
                reject(err);
            }
    
            resolve( nombreTemp );
        });

    });
}

module.exports = {
    subirArchivo
}