const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SavedGame extends Model {}

SavedGame.init(
    { 
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        character_id: {
            type: DataTypes.INTEGER,
        },
        character_name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        class_id: {
            type: DataTypes.INTEGER,
        },
        character_current_hp: {
            type: DataTypes.INTEGER,
        },
        enemy_id: {
            type: DataTypes.INTEGER,
        },
        enemy_current_hp: {
            type: DataTypes.INTEGER,
        },
        game_message: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'savedgame',
    }
)    

module.exports = SavedGame;