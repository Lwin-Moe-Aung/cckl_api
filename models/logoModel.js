module.exports = (sequelize, DataTypes) => {

    const Logo = sequelize.define("logo", {
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
   
    return Logo

}