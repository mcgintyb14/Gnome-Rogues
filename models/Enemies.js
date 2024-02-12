const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Enemies extends Model {}

Enemies.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        agility: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        special_move: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'enemies',
    }
);

module.exports = Enemies;