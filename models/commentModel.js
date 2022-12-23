module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define("comment", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comment: {
            type: DataTypes.TEXT,
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
            allowNull: false
        },
        post_id: { // name of foreign key using naming convention
            type: DataTypes.INTEGER,
            references: {
              model: { tableName: 'posts' }, // provide table name
              key: 'id' // PK of the User Model
            },
            allowNull: false,
            onUpdate: 'cascade',
            onDelete: 'cascade',
            allowNull: false
        },
        parent_id: {
            type:DataTypes.INTEGER,
        }
       
    })

    return Comment

}