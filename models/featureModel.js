module.exports = (sequelize, DataTypes) => {

    const Feature = sequelize.define("feature", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        e_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        m_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        e_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        m_description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    return Feature

}
