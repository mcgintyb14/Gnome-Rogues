const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cards extends Model {}

// Each of the values below would represent individual cards, which will be seeded as hard coded data into this model 

Cards.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        move_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        damage: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        block: {
            type: DataTypes.INTEGER
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
      }
)

module.exports = { Cards }

//cardId - primary key
//deckID (deck will be through table to class)