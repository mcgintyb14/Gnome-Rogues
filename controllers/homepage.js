const router = require('express').Router();
// We are pulling in all of the models 
const { User, Character, Enemies, Gnome, Card, Hand, Deck } = require('../models');

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
    res.render('homepage', gnome);
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

    // This will be a placeholder for login later
    // req.session.save(() => {
    //   req.session.loggedIn = true;

    //   res.status(200).json(dbUserData);
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/character', async (req, res) => {
  try {
    // Find the Gnome data based on the selected class_id
    const gnomeData = await Gnome.findByPk(req.body.class_id);

    // If the gnomeData is found, create a new Character
    if (gnomeData) {
      const characterData = await Character.create({
        name: req.body.name,
        class_id: req.body.class_id, // This should be the selected class_id
 	// Map these attributes from gnomeData to the Character model
        strength: gnomeData.strength,
        agility: gnomeData.agility,
        current_hp: 100 // Assuming initial HP is 100
      });

      res.status(201).json(characterData);
    } else {
      res.status(404).json({ error: 'Data not found for the selected class' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});




module.exports = router;
