
const { response } = require('express');

const getUsuarios = (req, res = response) => {

    const { q, nombre = 'no name' , apikey, page = 1, limit = 10 } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const putUsuarios = (req, res) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controlador',
        id
    });
}

const postUsuarios = (req, res) => {
    
    const { nombre, edad } = req.body;
    
    res.json({
        msg: 'post API - controlador',
        nombre, 
        edad
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