const { response } = require('express');
const { Category } = require('../models');

const getCategories = async(req, res) => {
    const { limit = 5, offset = 0 } = req.query;
    const [categories, total] = await Promise.all([
        Category.find({ status: true })
        .skip(Number(offset))
        .limit(Number(limit))
        .populate('user'),
        Category.countDocuments({ status: true })
    ])
    res.json({
        total,
        categories
    })

}

const getCategoryById = async(req, res) => {

    const { id } = req.params;
    const category = await Category.findById(id).populate('user');
    res.json(category);
}

const addCategory = async(req, res = response) => {
    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({ name });
    if (categoryDB) {
        return res.status(400).json({
            msg: `La categoria: ${name}, ya existe en la DB`
        });
    }

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);
    await category.save();

    return res.json({
        category
    })
}

const updateCategory = async(req, res) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    res.json(category);

}

const deleteCategory = async(req, res) => {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

    return res.json(category);

}

module.exports = {
    addCategory,
    getCategoryById,
    getCategories,
    updateCategory,
    deleteCategory
}