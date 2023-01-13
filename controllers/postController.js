const slugify = require('slugify')
const db =  require("../models");
const { post } = require('../routes/posts');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const Category = db.categories;
const PostCategory = db.post_categories;
const { Sequelize, Op } = require("sequelize");

//* get all posts by admains
const checkSlug = async (req, res) => {
  const slug = slugify(req.body.post_title, { lower: true, strict: true })
  const post = await Post.findOne({ where: { slug: slug}});
  if(post) throw new Error("Slug already exist!");
  
  return res.status(200).json( slug);
}

//* get all posts by admains
const getAllPosts = async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);
  let page = 0;
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
      page = pageAsNumber;
  }
  let size = 10;
  if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 50) && !(sizeAsNumber < 1)){
      size = sizeAsNumber;
  }

  const posts = await Post.findAll({  
    attributes: {
      include: [[Sequelize.fn("COUNT", Sequelize.col(`comments.id`)), "commentCount"]]
    },
    include:[ 
      {
        model: User,
        attributes: ['id', 'username', 'email', 'photo'],
      },
      {
        model: Comment,  attributes: ['id', 'comment'],
      }
    ],
    limit: size,
    offset: page * size,
    subQuery:false,
    group: ['Post.id'],
    order: [['createdAt', 'DESC']]

  });
  return res.status(200).json({ data: posts, totalPages: 1 });

}

//* get post by admins through ID
const getPost = async (req, res) => {
  const post = await Post.findOne({
   
    include:[
      {
        model: Category, 
        attributes: ['id', 'name', 'slug'],
        through: {attributes: []},
        where: {
          published:true
        }
      },
      {
        model: User,
        attributes: ['id', 'username', 'photo', 'email'],
      }
    ],
    where: { slug: req.params.slug }
  });
  if( post == null ) throw new Error("Post not found!");

  const data = await Post.findOne({
    attributes: {
      include: [[Sequelize.fn("COUNT", Sequelize.col("comments.id")), "commentCount"]]
    },
    include:[
      {
        model: Comment,  attributes: ['id', 'comment'],
      },
    ],
    group: ['Post.id'],
    where: { slug: req.params.slug }
  });
  post.dataValues.commentCount = data.dataValues.commentCount;
  // console.log(post);
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
  // console.log(req.body)
  //* check slug already exist or not
  const slug = slugify(req.body.title, { lower: true, strict: true })
  const data = await Post.findOne({ where: { slug: slug, id: {[Op.ne]: req.body.id}}});
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

//* get random post
const getRandomPosts = async (req, res) => {
  const limit = Number.parseInt(req.query.limit);
  // return res.send({limit});
  const randomPosts = await Post.findAll({ 
      attributes: {
        include: [[Sequelize.fn("COUNT", Sequelize.col(`comments.id`)), "commentCount"]]
      },
      include:[
        {
        model: Comment,  attributes: ['id', 'comment']
        }
      ],
      order: Sequelize.literal('rand()'), 
      limit,
      subQuery:false,
      group: ['Post.id'],
      where: { published: true} 
    });
  return res.status(200).json(randomPosts)
}

//* get popular post
const getPopularPosts = async (req, res) => {
  const limit = Number.parseInt(req.query.limit);

  const randomPosts = await Post.findAll({ 
      attributes: {
        include: [[Sequelize.fn("COUNT", Sequelize.col(`comments.id`)), "commentCount"]]
      },
      include:[
        {
        model: Comment,  attributes: ['id', 'comment']
        }
      ],
      order: [['view_count', 'DESC']],
      limit,
      subQuery:false,
      group: ['Post.id'],
      where: { published: true} 
    });
  return res.status(200).json(randomPosts)
}

//* get related posts
const getRelatedPosts = async (req, res) => {
  const limit = Number.parseInt(req.query.limit);
  const cat = req.query.cat.split("&");
  const selfPostSlug = req.query.selfPostSlug || "";
  console.log(cat);
  console.log(selfPostSlug);
  console.log(limit);


  //* getting post id 
  const postId =[
    ...(await Category.findAll({ 
      attributes: ['id', 'name'],
      include:[
        { 
          model: Post, 
          attributes: ['id'], 
        }
      ],
      subQuery:false,
      where: { slug: cat} 
    })),
  ].map(cate => cate.posts.map(post => post.id));

  let arr = [];
  postId.map(ele => arr=[...arr,...ele]);
  const unique = arr.filter((item, i, ar) => ar.indexOf(item) === i);

  //* getting related posts
  const relatedPosts = await Post.findAll({  
    attributes: {
      include: [[Sequelize.fn("COUNT", Sequelize.col(`comments.id`)), "commentCount"]]
    },
    include:[{ model: Comment,  attributes: ['id', 'comment'] }],
    limit,
    subQuery:false,
    group: ['Post.id'],
    where:{id: unique, slug: {[Op.ne]: selfPostSlug}},
    order: Sequelize.literal('rand()'),
  });

  return res.status(200).json(relatedPosts)
 
}

module.exports = { 
    getAllPosts, 
    getPost, 
    createPost, 
    updatePost, 
    deletePost, 
    checkSlug,
    getRandomPosts,
    getPopularPosts,
    getRelatedPosts
}
