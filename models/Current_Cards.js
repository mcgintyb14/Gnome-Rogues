const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Current_Cards extends Model {}

// Each of the values below would represent individual cards, which will be seeded as hard coded data into this model 

Current_Cards.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        character_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Character',
                key: 'id'
            }
        },
        card_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Cards',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
      }
)

module.exports = { Current_Cards }