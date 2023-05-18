const dbConfig = require('../config/dbConfig.js');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        dialectOptions: dbConfig.dialectOptions,
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
db.like_comment = require( './likeCommentModel.js')(sequelize, DataTypes);
db.like_post = require( './likePostModel.js')(sequelize, DataTypes);
db.navbar_menus = require( './navbarMenuModel.js')(sequelize, DataTypes);
db.navbar_sub_menus = require( './navbarSubMenuModel.js')(sequelize, DataTypes);
db.logo = require( './logoModel.js')(sequelize, DataTypes);
db.banner = require( './bannerModel.js')(sequelize, DataTypes);
db.heros_people = require( './herosPeopleModel.js')(sequelize, DataTypes);
db.heros_text = require( './herosTextModel.js')(sequelize, DataTypes);
db.feature = require( './featureModel.js')(sequelize, DataTypes);
db.map = require( './mapModel.js')(sequelize, DataTypes);



db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})



//* one to Many Relation
db.navbar_menus.hasMany(db.navbar_sub_menus, { foreignKey: 'parent_menu_id'})
db.navbar_sub_menus.belongsTo(db.navbar_menus, { foreignKey: 'parent_menu_id'})

db.users.hasMany(db.posts, { foreignKey: 'user_id'})
db.posts.belongsTo(db.users, { foreignKey: 'user_id'})

db.users.hasMany(db.comments, { foreignKey: 'user_id'})
db.comments.belongsTo(db.users, { foreignKey: 'user_id'})

db.posts.hasMany(db.comments, { foreignKey: 'post_id'})
db.comments.belongsTo(db.posts, { foreignKey: 'post_id'})

//* Many to Many 
db.posts.belongsToMany(db.categories, { through: 'post_category'});
db.categories.belongsToMany(db.posts, { through: 'post_category'});

db.users.belongsToMany(db.posts, { through: 'like_comment'});
db.posts.belongsToMany(db.users, { through: 'like_comment'});

db.users.belongsToMany(db.comments, { through: 'like_post'});
db.comments.belongsToMany(db.users, { through: 'like_post'});



module.exports = db