module.exports = (sequelize, DataTypes) => {

    const HerosPeople = sequelize.define("heroes_people", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        e_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        m_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        e_job_title: {
            type: DataTypes.STRING,
        },
        m_job_title: {
            type: DataTypes.STRING,
        },
        fb_link: {
            type: DataTypes.STRING
        },
    })
    return HerosPeople
}
