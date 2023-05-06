module.exports = (sequelize, DataTypes) => {

    const Map = sequelize.define("map", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        map: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    })

    return Map

}
