const Category = require('../models/category');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    return res.status(201).json({
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCategories,
  createCategory,
};