const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Gnome extends Model {}

Gnome.init(
    {
        class_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        // We will need to pull this data from a form in the front end (using list input)
        class_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        MaxHP: {
            type: DataTypes.INTEGER,
        },
        Strength: {
            type: DataTypes.INTEGER,
        },
        Agility: {
            type: DataTypes.INTEGER,
        },
        Image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'gnome',
      }
)

module.exports = Gnome