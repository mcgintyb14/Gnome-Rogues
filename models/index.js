const User = require('./User');
const Character = require('./Character');
const Enemies = require('./Enemies');
const Gnome = require('./classes/Gnome');
const Card = require('./Card');
const Hand = require('./Hand');
const Deck = require('./Deck');
const SavedGame = require('./Savedgame');

User.hasOne(Character, {});

Character.belongsTo(User, {});

Hand.hasMany(Card, {});

Deck.hasMany(Card, {});



module.exports = { User, Character, Enemies, Gnome, Card, Hand, Deck, SavedGame };
