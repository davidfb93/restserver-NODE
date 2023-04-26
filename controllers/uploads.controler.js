const path = require('path');
const { response } = require("express");

const cargarArchivo = async (req, res = response) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No files were uploaded.'});
        return;
    }

    const { archivo } = req.files;
    const nombreCortado = archivo.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    // Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            msg: `La extensión ${ extensionArchivo } no es permitida, las permitidas son ${ extensionesValidas }`
        })
    }

    res.json({ extensionArchivo })

/*     const uploadPath = path.join( __dirname , '../uploads/' , archivo.name);

    archivo.mv(uploadPath,  (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json({ msg: 'File uploaded to ' + uploadPath });
    }); */

}

module.exports = {
    cargarArchivo
}