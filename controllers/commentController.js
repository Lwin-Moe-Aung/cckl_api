const jwt = require('jsonwebtoken');
const db =  require("../models");
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const sequelize = db.sequelize;
const LikeComment = db.like_comment;
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

//* delete comment
const deleteComment = async (req, res) => {
    const comment = await Comment.findOne({
        where: { id: req.params.commentId}
    });
    if (comment.user_id !== req.user_id) {
        throw new Error("You are not allow to delete this comment!")
    }
    comment.destroy();
    return res.status(200).json(comment.id);
}

//* like and unlike comment
const toggleLikeComment = async (req, res) => {
    const data = {
        userId: req.user_id, 
        commentId: req.params.commentId
    }
    const like = await LikeComment.findOne({
        where: { ...data },
    })
    if (like == null) {
        return res.status(200).json(
            await LikeComment.create({ ...data })
                .then(() => {
                    return { addLike: true }
            })
        )
    } else {
        return res.status(200).json(
            await LikeComment.destroy({ where: { ...data } })
                .then(() => {
                    return { addLike: false }
            })
        )
    }
}

module.exports = { 
    createComment, 
    updateComment,
    deleteComment,
    toggleLikeComment
}
