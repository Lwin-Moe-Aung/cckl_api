module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("category", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        published: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
            defaultValue: true
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })

    return Category

}
