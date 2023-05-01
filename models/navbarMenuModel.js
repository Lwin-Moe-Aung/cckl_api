module.exports = (sequelize, DataTypes) => {

    const NavbarMenu = sequelize.define("navbar_menu", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        e_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        m_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        published: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
            defaultValue: true
        },
    })

    return NavbarMenu

}
