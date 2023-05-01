module.exports = (sequelize, DataTypes) => {

    const HerosText = sequelize.define("heroes_texts", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        e_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        m_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        e_description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        m_description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })

    return HerosText

}
