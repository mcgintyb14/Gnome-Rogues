const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Deck extends Model {}

Deck.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        class_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'gnome',
                key: 'id',
            }
        },
        card_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'cards',
                key: 'id',
            }
        }
    },
    {
        sequelize, // Moved inside the object
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'deck',
    }
)

module.exports = Deck

//deckid - primary key (char model will have foreign key)
//deck will have one to many relationship with cards
