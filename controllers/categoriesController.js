const db =  require("../models");
const Category = db.categories;

//* get all categoies by admins
const getAllCategories = (req, res) => {
    return res.send({
        data: res.paginatedResults,
        totalPages: res.totalPages
    });
}

//* get categoy by admins through category ID
const getCategory = async (req, res) => {
    let category = await Category.findOne({ where: { id: req.params.id }});
    if( category == null ) throw new Error("Category not found!");

    return res.status(200).json(category);
}

//* create category by admins
const createCategory = async (req, res) => {
    await Category.create({
        name: req.body.name,
        published: req.body.published
    });
    return res.status(200).json('Category successfully created!');
    // throw new Error("User not found dd");
}
//* update category by admins 
const updateCategory = async (req, res) => {
    const category = await Category.findOne({ where: { id: req.body.id}});
    if(!category) throw new Error("Category doesn't exist!");

    category.name = req.body.name;
    category.published = req.body.published;
    category.save();
    return res.status(200).json(category);
}
//* delete category by admins
const deleteCategory = async (req, res) => {
    await Category.destroy({ where: {id: req.body.category_id}, force: true});

    return res.status(200).json("Category deleted successfully!");

}
module.exports = { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory}