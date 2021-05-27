const Role = require('../models/role');
const User = require('../models/user');

const isRoleValidate = async(rol = '') => {
    const existsRole = await Role.findOne({ rol });
    if (!existsRole) {
        throw new Error(`${rol} no esta registrado en la base de datos`);
    }
}

const emailExists = async(email = '') => {
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        throw new Error(`El email ${email} ya esta registrado en la base de datos`);
    }
}

const existsId = async(id) => {
    const existsUserById = await User.findById(id);
    if (!existsUserById) {
        throw new Error(`El id no existe ${id}`);
    }
}







module.exports = {
    isRoleValidate,
    emailExists,
    existsId
}