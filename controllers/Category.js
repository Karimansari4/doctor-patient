const Category = require("../models/Category")



exports.addCategory = async (req, res) => {
    const name = req.body.name
    try {
        if (!name) {
            return res.status(400).json({ msg: 'Please enter a category name', success: false })
        }
        const result = await Category.create({ name })
        if (result) {
            return res.status(200).json({ msg: 'Category added successfully', success: true, result })
        }
        return res.status(400).json({ msg: 'Failed to add category', success: false })
    } catch (error) {
        console.log("error on addCategory", error);
        return res.status(500).json({ msg: error.message, success: false, error })
    }
}

exports.getAllCategory = async (req, res) => {
    try {
        const result = await Category.find({})
        if (result) {
            return res.status(200).json({ msg: 'All categories', success: true, result })
        }
        return res.status(404).json({ msg: 'No categories found', success: false })
    } catch (error) {
        console.log("error on getAllCategory", error);
        return res.status(500).json({ msg: error.message, success: false, error })
    }
}

exports.getCategoryById = async (req, res) => {
    const id = req.params.id
    try {
        if (!id) {
            return res.status(400).json({ msg: 'Please enter a category id', success: false })
        }
        const result = await Category.findById(id)
        if (result) {
            return res.status(200).json({ msg: 'Category found', success: true, result })
        }
        return res.status(404).json({ msg: 'Category not found', success: false })
    } catch (error) {
        console.log("error on getCategoryById", error);
        return res.status(500).json({ msg: error.message, success: false, error })
    }
}

exports.deleteCategory = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Category.findByIdAndDelete(id)
        if (result) {
            return res.status(200).json({ msg: 'Category deleted successfully', success: true, result })
        }
        return res.status(404).json({ msg: 'Category not found', success: false })
    } catch (error) {
        console.log("error on deleteCategory", error);
        return res.status(500).json({ msg: error.message, success: false, error })
    }
}