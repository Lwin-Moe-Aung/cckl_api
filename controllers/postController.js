const slugify = require('slugify')
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");
const db =  require("../models");
const { post } = require('../routes/posts');
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const Category = db.categories;
const PostCategory = db.post_categories;
const sequelize = db.sequelize
const LikeComment = db.like_comment;
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
    group: ['id'],
    order: [['createdAt', 'DESC']]

  });

  return res.status(200).json({ data: posts, totalPages: 1 , total: await Post.count()});

}

//* get post by admins through ID
const getPost = async (req, res) => {
  //increase count
  Post.increment('view_count', { by: 1, where: { slug: req.params.slug }});

  const post = await Post.findOne({
    attributes: { 
      include: [[
        sequelize.literal(`(
            SELECT COUNT(*)
            FROM comments
            WHERE
                comments.post_id = post.id
        )`),
        'commentCount'
      ]] 
    },
    include:[
      {
        model: Comment,
        attributes: { 
          include: [[
            sequelize.literal(`(
                SELECT COUNT(*)
                FROM like_comments
                WHERE
                  like_comments.commentId = comment.id
            )`),
            'likeCount'
          ]] 
        },
        include:[{ 
          model: User,
          required:false,
        }],
        separate: true,
        order: [['createdAt', 'DESC']]
      },
      {
        model: Category, 
        required:false,
        attributes: ['id', 'name', 'slug'],
        through: {attributes: []},
        include:[{ model: Post, required:false, where:{ slug: {[Op.ne]: req.params.slug}},}],
        where: {
          published:true
        }
      },
      {
        model: User,
        attributes: ['id', 'username', 'photo', 'email']
      }
    ],
    subQuery:false,
    where: { slug: req.params.slug }
  })
  .then(async post => {
    const likesComments = req.user_id 
      ? await LikeComment.findAll({
        where: {
          userId: req.user_id,
          commentId: post.comments.map(comment => comment.id),
        },
      })
      : [];
      
    return {
      ...post.dataValues,
      comments: post.comments.map(comment => {
        return {
          ...comment.dataValues,
          likedByMe: likesComments.find(like => like.commentId === comment.id),
        }
      })
    }
  })

  if( post == null ) throw new Error("Post not found!");

  const postId = post?.categories.map(item => item.posts.map(el => el.id));
  let arr = [];
  postId.map(ele => arr=[...arr,...ele]);
  const unique = arr.filter((item, i, ar) => ar.indexOf(item) === i);
  
  if(unique.length !== 0){
    //* getting related posts
    const relatedPosts = await Post.findAll({  
      attributes: {
        include: [[Sequelize.fn("COUNT", Sequelize.col(`comments.id`)), "commentCount"]]
      },
      include:[{ model: Comment,  attributes: ['id', 'comment'] }],
      limit:3,
      subQuery:false,
      group: ['id'],
      where:{id: unique},
      order: Sequelize.literal('rand()'),
    });
    return res.status(200).json({...post, relatedPosts});
  }
 
  return res.status(200).json({...post, relatedPosts:[]});
}

//* create new post by admins
const createPost = async (req, res) => {
  let slug = slugify(req.body.title, { 
    lower: true, 
    strict: true,
    locale: 'my',
    remove: undefined 
  })
  if(!slug){
    slug = randomstring.generate({
      length: 12,
      charset: 'alphabetic'
    });
  }
  
  const data = await Post.findOne({ where: { slug: slug}});
  if(data) throw new Error("Title already exist!");

  const post = await Post.create({
    title: req.body.title,
    cover_image: req.body.cover_image,
    description: req.body.description,
    image: req.body.image,
    slug: slug,
    user_id: req.body.user_id,
    view_count:0,
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
  let slug = slugify(req.body.title, { 
    lower: true, 
    strict: true,
    locale: 'my',
    remove: undefined 
  })
  if(!slug){
    slug = randomstring.generate({
      length: 12,
      charset: 'alphabetic'
    });
  }
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
      group: ['id'],
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
      group: ['id'],
      where: { published: true} 
    });
  return res.status(200).json(randomPosts)
}

//* get related posts
const getRelatedPosts = async (req, res) => {
  const limit = Number.parseInt(req.query.limit);
  const cat = req.query.cat.split("&");
  const selfPostSlug = req.query.selfPostSlug || "";
  // console.log(cat);
  // console.log(selfPostSlug);
  // console.log(limit);


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
    group: ['id'],
    where:{id: unique, slug: {[Op.ne]: selfPostSlug}},
    order: Sequelize.literal('rand()'),
  });

  return res.status(200).json(relatedPosts)
 
}

//* get posts by category
const getPostsByCategory = async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);
  const slug = req.query.cat;

  let page = 0;
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
      page = pageAsNumber;
  }
  let size = 10;
  if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 50) && !(sizeAsNumber < 1)){
      size = sizeAsNumber;
  }

  const catPosts = await Category.findAll({  
    attributes: ['id', 'name'],
    // raw: true,
    include:[ 
      {
        model: Post,
        attributes: { 
            include: [[
              sequelize.literal(`(
                  SELECT COUNT(*)
                  FROM comments
                  WHERE
                      comments.post_id = posts.id
              )`),
              'commentCount'
            ]] 
        },
      }
    ],
    limit: size,
    offset: page * size,
    subQuery:false,
    order: [['createdAt', 'DESC']],
    where: { slug }
  });

  const total = await Category.findOne({  
    attributes: {
      include: [[Sequelize.fn("COUNT", Sequelize.col(`posts.id`)), "total_row"],]
    },
    include:[{ model: Post}],
    group: ['id'],
    where: {slug}
  }).then(val => val);
  // console.log(total);
  return res.status(200).json({ data: catPosts[0]?.posts, totalPages: 1 , total});
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
    getRelatedPosts,
    getPostsByCategory
}
