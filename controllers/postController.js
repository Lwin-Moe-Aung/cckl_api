const slugify = require('slugify')
const db =  require("../models");
const { post } = require('../routes/posts');
const Post = db.posts;
const PostCategory = db.post_categories;
const Sequelize = db.Sequelize;

//* get all posts by admains
const checkSlug = async (req, res) => {
  const slug = slugify(req.body.post_title, { lower: true, strict: true })
  const post = await Post.findOne({ where: { slug: slug}});
  if(post) throw new Error("Slug already exist!");
  
  return res.status(200).json( slug);
}

//* get all posts by admains
const getAllPosts = async (req, res) => {
  const posts = await Post.findAll({  
    attributes: ['id', 'title', 'cover_image', 'slug', 'view_count', 'published', 'createdAt'],
    include:[ 
      {
        association:'postUser',
        attributes: ['id', 'username', 'email', 'photo'],
      },
      {
        association: 'postComment',
        attributes: ['id', 'comment']
        // attributes: [[Sequelize.fn("COUNT", Sequelize.col("postComment.id")), "comment_counts"]] 
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  return res
    .status(200)
    .json({
      data: posts,
      totalPages: 1
    });
}

//* get post by admins through ID
const getPost = async (req, res) => {
  const post = await Post.findOne({
    include:[
      {
        association: 'postCategories',
        attributes: ['id', 'name'],
        where:{
          published:true
        }
      },
      {
        association: 'postUser',
        attributes: ['id', 'username', 'photo', 'email'],
      }
    ],
    where: { slug: req.params.slug }
  });
  if( post == null ) throw new Error("Post not found!");

  return res.status(200).json(post);
}

//* create new post by admins
const createPost = async (req, res) => {
  const slug = slugify(req.body.title, { lower: true, strict: true })
  const data = await Post.findOne({ where: { slug: slug}});
  if(data) throw new Error("Title already exist!");

  const post = await Post.create({
    title: req.body.title,
    cover_image: req.body.cover_image,
    description: req.body.description,
    image: req.body.image,
    slug: slug,
    user_id: req.body.user_id,
    published: req.body.published
  });

  req.body.category_id.map(item => {
    PostCategory.create({
      postId: post.id,
      categoryId: item.id
    })
  });

  return res.status(200).json(post)
}

//* update post by admins
const updatePost = async (req, res) => {
  //* check slug already exist or not
  const slug = slugify(req.body.title, { lower: true, strict: true })
  const data = await Post.findOne({ where: { slug: slug}});
  if(data) throw new Error("Title already exist!");

  const post = await Post.findOne({ where: { id: req.body.id}});
  if(!post) throw new Error("Post doesn't exist!");

  post.title = req.body.title;
  post.cover_image = req.body.cover_image,
  post.description = req.body.description;
  post.image = req.body.image;
  post.slug = slug;
  post.user_id = req.body.user_id;
  post.published = req.body.published;
  post.save();

  await PostCategory.destroy({where:{ postId: req.body.id }});
  
  await req.body.category_id.map(item => {
    PostCategory.create({
      postId: req.body.id,
      categoryId: item.id
    })
  });
  return res.status(200).json(post);
}

//* delete post by admins
const deletePost = async (req, res) => {
  await Post.destroy({ where: {id: req.body.post_id}, force: true});

  return res.status(200).json("Post deleted successfully!");
}

module.exports = { getAllPosts, getPost, createPost, updatePost, deletePost, checkSlug}
