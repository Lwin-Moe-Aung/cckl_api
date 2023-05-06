const { createUserSchema, updateUserSchema, deleteUserSchema } = require('./userSchema');
const { createCategorySchema, updateCategorySchema, deleteCategorySchema } = require('./categorySchema');
const { createPostSchema, updatePostSchema, deletePostSchema } = require('./postSchema');
const { checkSlugSchema } = require('./checkSlugSchema');
const { createCommentSchema, updateCommentSchema, deleteCommentSchema } = require('./commentSchema');
const { createNavbarMenuSchema, updateNavbarMenuSchema, deleteNavbarMenuSchema } = require('./navbarMenuSchema');
const { createNavbarSubMenuSchema, updateNavbarSubMenuSchema, deleteNavbarSubMenuSchema } = require('./navbarSubMenuSchema');
const { createBannerSchema } = require('./bannerSchema');
const { createHeroesPeopleSchema, updateHeroesPeopleSchema, deleteHeroesPeopleSchema } = require('./heroesPeopleSchema');
const { createHeroesTextSchema } = require('./heroesTextSchema');
const { createFeatureSchema, updateFeatureSchema, deleteFeatureSchema } = require('./featureSchema');
const { createMapSchema } = require('./mapSchema');

module.exports = {
    createUserSchema,
    updateUserSchema,
    deleteUserSchema,
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema,
    createPostSchema,
    updatePostSchema,
    deletePostSchema,
    checkSlugSchema,
    createCommentSchema,
    updateCommentSchema,
    deleteCommentSchema,
    createNavbarMenuSchema,
    updateNavbarMenuSchema,
    deleteNavbarMenuSchema,
    createNavbarSubMenuSchema, 
    updateNavbarSubMenuSchema, 
    deleteNavbarSubMenuSchema,
    createBannerSchema,
    createHeroesPeopleSchema,
    updateHeroesPeopleSchema,
    deleteHeroesPeopleSchema,
    createHeroesTextSchema,
    createFeatureSchema,
    updateFeatureSchema,
    deleteFeatureSchema,
    createMapSchema
}

