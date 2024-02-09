const sequelize = require('../config/connection');
// const gnomeData = require('./Gnome.json');
// const cardData = require('./Card.json');
// const enemiesData = require('./Enemies.json');
const userData = require('./user.json');
// const handData = require('./Hand,json');
// const deckData = require('./Deck.json');
// const characterData = require('./character.json');
// const { User, Character, Enemies, Gnome, Card, Hand, Deck } = require('../models');
const { User } = require('../models');

const seedDatabase = async () => {

  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
       returning: true
    });

  } catch (error) {
    console.error('Unable to connect to or seed the database:', error);
  }


  //
  // await Gnome.bulkCreate(gnomeData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  // await Card.bulkCreate(cardData, {
  //   individualHooks: true,
  //    returning: true
  // });

  // await Enemies.bulkCreate(enemiesData, {
  //   individualHooks: true,
  //    returning: true
  // });
  //
  // await Character.bulkCreate(characterData, {
  //   individualHooks: true,
  //    returning: true
  // });

  // await Deck.bulkCreate(deckData, {
  //   individualHooks: true,
  //    returning: true
  // });
  //
  // await Hand.bulkCreate(handData, {
  //   individualHooks: true,
  //    returning: true
  // });

  process.exit(0);
};

seedDatabase();