module.exports = (sequelize, DataTypes) => {

    const Banner = sequelize.define("banners", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        e_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        m_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    return Banner

}
