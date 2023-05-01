module.exports = (sequelize, DataTypes) => {

    const NavbarSubMenu = sequelize.define("navbar_sub_menu", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        e_title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        m_title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        e_description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        m_description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        parent_menu_id: { // name of foreign key using naming convention
            type: DataTypes.INTEGER,
            references: {
              model: { tableName: 'navbar_menu' }, // provide table name
              key: 'id' // PK of the User Model
            },
            allowNull: false,
            onUpdate: 'cascade',
            onDelete: 'cascade',
        },
    })
    return NavbarSubMenu
}
