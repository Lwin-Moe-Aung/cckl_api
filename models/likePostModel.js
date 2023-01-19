module.exports = (sequelize, DataTypes) => {
    
    const Like_Post = sequelize.define("like_post", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: { // name of foreign key using naming convention
            type: DataTypes.INTEGER,
            references: {
              model: { tableName: 'users' }, // provide table name
              key: 'id' // PK of the User Model
            },
            allowNull: false,
            onUpdate: 'cascade',
            onDelete: 'cascade',
        },
        postId: { // name of foreign key using naming convention
            type: DataTypes.INTEGER,
            references: {
              model: { tableName: 'posts' }, // provide table name
              key: 'id' // PK of the User Model
            },
            allowNull: false,
            onUpdate: 'cascade',
            onDelete: 'cascade',
        }
    })
   
    return Like_Post

}