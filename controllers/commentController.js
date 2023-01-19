const jwt = require('jsonwebtoken');
const db =  require("../models");
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const sequelize = db.sequelize
const { Sequelize, Op } = require("sequelize");
const { post } = require('../routes/users');

//* create new Comment
const createComment = async (req, res) => {
    const comment = await Comment.create({
        comment: req.body.comment,
        user_id: req.user_id,
        post_id: req.params.postId,
        parent_id: req.body.parent_id,
    }).then(async (comment) => {
        const newcmt =  await Comment.findOne({
            include:[{ 
                model: User,
                required:false,
            }],
            where: {id:comment.id}
        })
        return {
            ...newcmt.dataValues,
            likeCount: 0,
            likedByme: false
        }
    });
    return res.status(200).json(comment);
}

//* update comment
const updateComment = async (req, res) => {
    const comment = await Comment.findOne({
            where: { id: req.params.commentId }
    })
    if (comment.user_id !== req.user_id) {
        throw new Error("You are not allow to edit this comment!")
    }
    comment.comment = req.body.comment;
    comment.save();
    
    return res.status(200).json(comment);
}

module.exports = { 
    createComment, 
    updateComment
}
