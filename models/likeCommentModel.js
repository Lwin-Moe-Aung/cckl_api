module.exports = (sequelize, DataTypes) => {
    
    const Like_Comment = sequelize.define("like_comment", {
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
        commentId: { // name of foreign key using naming convention
            type: DataTypes.INTEGER,
            references: {
              model: { tableName: 'comments' }, // provide table name
              key: 'id' // PK of the User Model
            },
            allowNull: false,
            onUpdate: 'cascade',
            onDelete: 'cascade',
        }
    })
   
    return Like_Comment

}