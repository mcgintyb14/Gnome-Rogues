const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Card extends Model {}

Card.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        damage: {
            type: DataTypes.INTEGER
        },
        dodge: {
            type: DataTypes.INTEGER
        }
    },
    {
    sequelize, // Moved inside the object
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'card',
    }
)

module.exports = Card;
