const db =  require("../models");
const Category = db.categories;
const Post = db.posts;
const {Sequelize} = require('sequelize');

//* get all categoies by admins
const getAllCategories = (req, res) => {
    return res.send({
        data: res.paginatedResults,
        totalPages: res.totalPages
    });
}

//* get all published categories by admins
const getAllPublishedCategories = async (req, res) => {
    const cates = await Category.findAll({ 
        where: {published: true},
        attributes: ['id', 'name']
    });
    if( cates == null ) throw new Error("Categories not found!");

    return res.status(200).json(cates);
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

//* get categories and their post count
const postCount = async (req, res) => {
    const categories = await Category.findAll({
        attributes: { 
            include: [[Sequelize.fn("COUNT", Sequelize.col("posts.id")), "postCount"]] 
        },
        include: [{
            model: Post, attributes: [],  through: {attributes: []},
        }],
        group: ['Category.id'],
        where: {published: true}
    })
    res.send(categories);
}
module.exports = { getAllCategories, getAllPublishedCategories, getCategory, createCategory, updateCategory, deleteCategory, postCount}