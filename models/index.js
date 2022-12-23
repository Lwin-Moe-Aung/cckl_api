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
    console.log('Error 123'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require( './userModel.js')(sequelize, DataTypes);
db.categories = require( './categoryModel.js')(sequelize, DataTypes);
db.posts = require( './postModel.js')(sequelize, DataTypes);
db.comments = require( './commentModel.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})



// 1 to Many Relation

db.users.hasMany(db.posts, {
    foreignKey: 'user_id',
    as: 'post'
})

db.categories.hasMany(db.posts, {
    foreignKey: 'category_id',
    as: 'post'
})

db.users.hasMany(db.comments, {
    foreignKey: 'user_id',
    as: 'comment'
})

db.posts.hasMany(db.comments, {
    foreignKey: 'post_id',
    as: 'comment'
})

// db.reviews.belongsTo(db.products, {
//     foreignKey: 'product_id',
//     as: 'product'
// })

module.exports = db