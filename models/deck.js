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
            type: Datatypes.INTEGER,
            references: {
                model: 'classes',
                key: 'id',
            }
        },
        card_id: {
            type: Datatypes.INTEGER,
            references: {
                model: 'cards',
                key: 'id',
            }
        }

    }
)

module.exports = { Gnome }

//deckid - primary key (char model will have foreign key)
//deck will have one to many relationship with cards
