const { response } = require('express')

const usersGet = (req, res = response) => {
    const { q, nombre = 'no name', token } = req.query;
    res.json({
        msg: "GET app controlador",
        q,
        nombre,
        token
    })
}

const usersPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: "Post app controlador",
        nombre,
        edad
    })
}

const usersPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: "Put app controlador",
        id
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: "Delete app controlador"
    })
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: "Patch app controlador"
    })
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}