const router = require('express').Router();
const { getCards } = require('../../utils/helpers');
const { User, Character, Enemies, Gnome, Card, Hand, Deck } = require('../../models');
const { generateUniqueId } = require('../../utils/uniequeid');

router.get('/', async (req, res) => {
    try {
        const allEnemies = await Enemies.findAll();
        const randomIndex = Math.floor(Math.random() * allEnemies.length);
        const randomEnemy = allEnemies[randomIndex];

        const deckData = await Deck.findAll({
            where: {
                class_id: 1
            }
        });

        const deck = deckData.map((deck) => deck.get({ plain: true }));
        const randomCards = getCards(deck);

        const characterData = await Character.findByPk(req.session.characterId);

        const classData = await Gnome.findByPk(characterData.class_id); 
        
        res.render('game', { enemy: randomEnemy, cards: randomCards, character: characterData });

        //sending data to frontend
        res.json({ enemy: randomEnemy, character: characterData, gnomeClass: classData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/loading', async (req, res) => {
    try {
        const { class_id } = req.query;

        const characterId = generateUniqueId(); 
        req.session.characterId = characterId;

        const gnomeData = await Gnome.findByPk(class_id);
        console.log(gnomeData);

        const handData = await Hand.findByPk(req.session.characterId);
        const characterData = await Character.findByPk(req.session.characterId);
        
        res.render('loading', { cards: handData, character: characterData, Gnome: gnomeData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/submit-form', async (req, res) => {
    try {
        // Extract form data from the request body
        const { username, password, email, characterName } = req.body;

        // Create a new User entry
        const newUser = await User.create({ username, password, email });

        // Create a new Character entry associated with the user
        const newCharacter = await Character.create({ name: characterName, UserId: newUser.id });

        // Redirect the user to a confirmation page or any other page
        res.redirect('/confirmation');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to process the form submission' });
    }
});

// Route to handle the submission of the character name form
router.post('/loading-character', async (req, res) => {
    try {
        const { characterName } = req.body; // Assuming the input field name for character name is 'characterName'

        // Create a new character entry in the Character model
        const newCharacter = await Character.create({ name: characterName });

        // Render the loading-character handlebars file with the appropriate character name data
        res.render('loading-character', { characterName });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/characterinfo', async (req, res) => {
    try {
        const allEnemies = await Enemies.findAll();
        const randomIndex = Math.floor(Math.random() * allEnemies.length);
        const randomEnemy = allEnemies[randomIndex];

        const handData = await Hand.findByPk(req.session.characterId);
        const characterData = await Character.findByPk(req.session.characterId);
        const classData = await Gnome.findByPk(characterData.class_id);        

        res.render('game', { enemy: randomEnemy, cards: randomCards, character: characterData });
        res.json({ enemy: randomEnemy, character: characterData, gnomeClass: classData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/test-error', (req, res, next) => {
    try {
        // Intentionally throw an error
        throw new Error('This is a test error');
    } catch (err) {
        // Pass the error to the error handling middleware
        next(err);
    }
});

module.exports = router;

