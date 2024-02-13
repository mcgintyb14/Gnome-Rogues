const router = require('express').Router();
// We are pulling in all of the models 
const { User, Character, Enemies, Gnome, Card, Hand, Deck, SavedGame } = require('../models');
const { getCards } = require('../utils/helpers');

router.get('/', async (req, res) => {
  try {
    // Get all classes from Gnome model and display on the homepage
    // This pulls in all data from the Gnome model, while excluding the array of card ids as this likel
    const gnomeData = await Gnome.findAll({});
    // Serialize data so the template can read it and render the appropriate data on the homepage=
    const gnome = gnomeData.map((gnome) => gnome.get({ plain: true }));

    // Pass serialized data (all gnome data) to the homepage to render; the homepage handlebars will need to have  placeholders for three different cards (potentially a #each loop to loop through all 3)
    // And the homepage handlebars file will also have placeholders within the card element for the keys in the Gnome model (all will be used)
    // Cards will display the name of the class, image, attributes, and available special moves (possibly)
    console.log(gnome);
    res.render('homepage', { gnomes: gnome });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/game/:id', async (req, res) => {
  try {
    // Get all classes from Gnome model and display on the homepage
    // This pulls in all data from the Gnome model, while excluding the array of card ids as this likel
    const gameData = await SavedGame.findByPk(req.params.id).then(model => model.get({ plain: true }));
    const characterData = await Character.findByPk(gameData.character_id).then(model => model.get({ plain: true }));
    const classData = await Gnome.findByPk(characterData.class_id).then(model => model.get({ plain: true })); 
    const enemyData = await Enemies.findByPk(gameData.enemy_id).then(model => model.get({ plain: true }))
    const deckData = await Deck.findAll({
      where: {
          class_id: classData.id
      }
  });

  let deck = deckData.map((deck) => deck.get({ plain: true }));
  // console.log(deck);
  let randomCards = await getCards(deck);

    // Serialize data so the template can read it and render the appropriate data on the homepage=
    // console.log(randomEnemy);
    // console.log('coming back on the client side', data)
    debugger
    res.render('game', { class: classData, character: characterData, enemy: enemyData, cards: randomCards } );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/account', async (req, res) => {
  try {
    const accountData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json(accountData);

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);

    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// The below post route is for posting a new character to the Character db, as well as making a new hand and adding it to the hand id (matching character id from the character model).
// ...This first pulls class data from the Gnome db matching what the user selected, then populates the body of the post request with data from the relevant class in the Gnome model
// ... (see attributes being set equal to Gnome data)
// After that, this includes a similar check on the newly created "characterData", and uses it to also create a new hand based on the newly created character. Note this hand currently
// Takes the card_ids specified for that class in the Gnome model

// router.post('/character-and-cards', async (req, res) => {
//   try {
//     // 
//     const characterId = generateUniqueId(); // Generate a unique ID for the character
//     req.session.characterId = characterId; // Store the character ID in the session
//     // Find the Gnome data based on the selected class_id
//     const gnomeData = await Gnome.findByPk(req.body.class_id);
//     console.log(gnomeData);
//     // If the gnomeData is found, create a new Character
//     if (gnomeData) {
//       // Create a new Character
//       const characterData = await Character.create({
//         name: req.body.name,
//         class_id: req.body.class_id,
//         strength: gnomeData.strength,
//         agility: gnomeData.agility,
//         current_hp: 100 // Assuming initial HP is 100
//       });

//       // If characterData is created successfully, proceed to create a new Hand
//       if (characterData) {
//         const handData = await Hand.create({
//           class_id: req.body.class_id,
//           card_ids: gnomeData.card_ids,
//           character_id: characterData.id // Assign the character_id to the Hand
//         });

//         res.status(201).json({ characterData, handData });
//       } else {
//         res.status(500).json({ error: 'Failed to create character' });
//       }
//     } else {
//       res.status(404).json({ error: 'Gnome data not found for the selected class_id' });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

router.post('/character-and-cards', async (req, res) => {
  try {
      const characterId = generateUniqueId();
      req.session.characterId = characterId;
      const gnomeData = await Gnome.findByPk(req.body.class_id);
      if (gnomeData) {
          const characterData = await Character.create({
              class_id: req.body.class_id,
              strength: gnomeData.strength,
              agility: gnomeData.agility,
              current_hp: 100
          });
          if (characterData) {
              const handData = await Hand.create({
                  class_id: req.body.class_id,
                  card_ids: gnomeData.card_ids,
                  character_id: characterData.id
              });
              res.status(201).json({ characterData, handData });
          } else {
              res.status(500).json({ error: 'Failed to create character' });
          }
      } else {
          res.status(404).json({ error: 'Gnome data not found for the selected class_id' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});


module.exports = router;
