const slugify = require('slugify')
const db =  require("../models");
const Post = db.posts;

//* get all posts by admains
const checkSlug = async (req, res) => {
  const slug = slugify(req.body.post_title, { lower: true, strict: true })
  const post = await Post.findOne({ where: { slug: slug}});
  if(post) throw new Error("Slug already exist!");
  
  return res.status(200).json( slug);
}

//* get all posts by admains
const getAllPosts = (req, res) => {
  return res.send({
    data: res.paginatedResults,
    totalPages: res.totalPages
  });
}

//* get post by admins through ID
const getPost = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id }});
  if( post == null ) throw new Error("Post not found!");

  return res.status(200).json(post);
}

//* create new post by admins
const createPost = async (req, res) => {
  //* check slug already exist or not
  const data = await Post.findOne({ where: { slug: req.body.slug}});
  if(data) throw new Error("Slug already exist!");

  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    slug: req.body.slug,
    user_id: req.body.user_id,
    category_id: req.body.category_id,
    published: req.body.published
  });

  return res.status(200).json(post)
}

//* update post by admins
const updatePost = async (req, res) => {
  //* check slug already exist or not
  const data = await Post.findOne({ where: { slug: req.body.slug}});
  if(data) throw new Error("Slug already exist!");

  const post = await Post.findOne({ where: { id: req.body.id}});
  if(!post) throw new Error("Post doesn't exist!");

  post.title = req.body.title;
  post.slug = req.body.slug;
  post.description = req.body.description;
  post.image = req.body.image;
  post.user_id = req.body.user_id;
  post.category_id = req.body.category_id;
  post.published = req.body.published;
  post.save();

  return res.status(200).json(post);
}

//* delete post by admins
const deletePost = async (req, res) => {
  await Post.destroy({ where: {id: req.body.post_id}, force: true});

  return res.status(200).json("Post deleted successfully!");
}

module.exports = { getAllPosts, getPost, createPost, updatePost, deletePost, checkSlug}
