const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Hand extends Model {}

Hand.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        character_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Character',
                key: 'id',
            }
        },
        card_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Card',
                key: 'id',
            }
        }
    }
);

module.exports = Hand