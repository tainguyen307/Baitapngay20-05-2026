const Category = require('../models/category');

const fetchCategories = async () => {

    const categories = await Category.find();

    return categories;
};

const createNewCategory = async (data) => {

    const category = await Category.create(data);

    return category;
};

module.exports = {
    fetchCategories,
    createNewCategory
};