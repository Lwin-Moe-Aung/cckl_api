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
            type: DataTypes.JSON
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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
        published: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
            defaultValue: true
        }
    })
   
    return Post

}