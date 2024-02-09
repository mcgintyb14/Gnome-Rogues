const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Hand extends Model {}

Hand.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        character_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'character',
                key: 'id',
            }
        },
        card_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'card',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'hand',
    }
);

module.exports = Hand