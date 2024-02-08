const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model {}

Character.init(
    {
       
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',  
                key: 'id',
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        class_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'classes',  
                key: 'id',
            }
        },
        current_hp: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        // deck_id?
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'character',
    }
);

module.exports = Character;
