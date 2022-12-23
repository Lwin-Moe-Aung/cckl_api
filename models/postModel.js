module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define("post", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: { // name of foreign key using naming convention
            type: DataTypes.INTEGER,
            references: {
              model: { tableName: 'users' }, // provide table name
              key: 'id' // PK of the User Model
            },
            allowNull: false,
            onUpdate: 'cascade',
            onDelete: 'cascade',
        },
        category_id: { // name of foreign key using naming convention
            type: DataTypes.INTEGER,
            references: {
              model: { tableName: 'categories' }, // provide table name
              key: 'id' // PK of the User Model
            },
            allowNull: false,
            onUpdate: 'cascade',
            onDelete: 'cascade',
        },
        published: {
            type: DataTypes.BOOLEAN
        }
    })

    return Post

}