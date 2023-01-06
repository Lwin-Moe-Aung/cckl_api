const dbConfig = require('../config/dbConfig.js');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('DB connected..')
})
.catch(err => {
    console.log('Error:'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require( './userModel.js')(sequelize, DataTypes);
db.categories = require( './categoryModel.js')(sequelize, DataTypes);
db.posts = require( './postModel.js')(sequelize, DataTypes);
db.comments = require( './commentModel.js')(sequelize, DataTypes);
db.post_categories = require( './postCategoryModel.js')(sequelize, DataTypes);


db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})



//* one to Many Relation
db.users.hasMany(db.posts, { foreignKey: 'user_id', as: 'userPost'})
db.posts.belongsTo(db.users, { foreignKey: 'user_id', as: 'postUser' })

db.users.hasMany(db.comments, { foreignKey: 'user_id', as: 'userComment' })
db.comments.belongsTo(db.users, { foreignKey: 'user_id', as: 'commentUser' })

db.posts.hasMany(db.comments, { foreignKey: 'post_id', as: 'postComment' })
db.comments.belongsTo(db.posts, { foreignKey: 'post_id', as: 'commentPost' })

//* Many to Many 
db.posts.belongsToMany(db.categories, { through: 'post_category'});
db.categories.belongsToMany(db.posts, { through: 'post_category'});

module.exports = db