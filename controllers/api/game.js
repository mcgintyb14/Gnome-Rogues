const router = require('express').Router();
const { getCards } = require('../../utils/helpers');
const { User, Character, Enemies, Gnome, Card, Hand, Deck } = require('../../models');
const { generateUniqueId } = require('../../utils/uniequeid');

let randomCards;
let deck = [];

// router.get('/', async (req, res) => {
//     try {
//         const allEnemies = await Enemies.findAll();
//         const randomIndex = Math.floor(Math.random() * allEnemies.length);
//         const randomEnemy = allEnemies[randomIndex];

//         //TODO: add below back in once session is working
//         // const characterData = await Character.findByPk(req.session.characterId);
//         const characterData = await Character.findByPk(1);
//         const classData = await Gnome.findByPk(characterData.class_id); 
        
//         //TODO: plugged in temp class_id and character id. Need to re-link.
//         const deckData = await Deck.findAll({
//             where: {
//                 class_id: characterData.class_id
//             }
//         });

//         deck = deckData.map((deck) => deck.get({ plain: true }));
//         randomCards = getCards(deck);

//         console.log(randomCards); // Log randomCards to the console

//         res.render('game', { enemy: randomEnemy, cards: randomCards, character: characterData });

//         //sending data to frontend
//         res.json({ enemy: randomEnemy, character: characterData, gnomeClass: classData });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

router.get('/', async (req, res) => {
    try {
        const allEnemies = await Enemies.findAll();
        const randomIndex = Math.floor(Math.random() * allEnemies.length);
        const randomEnemy = allEnemies[randomIndex];

        const characterData = await Character.findByPk(1);
        const classData = await Gnome.findByPk(characterData.class_id); 
        
        const deckData = await Deck.findAll({
            where: {
                class_id: characterData.class_id
            }
        });

        deck = deckData.map((deck) => deck.get({ plain: true }));
        randomCards = getCards(deck);

        console.log(randomCards); // Log randomCards to the console
        console.log(characterData);
        console.log(randomEnemy);
        console.log(classData);

        res.render('game', { enemy: randomEnemy, cards: randomCards, character: characterData, class: classData });

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
        console.log(gnomeData); // Log gnomeData to the console

        const handData = await Hand.findByPk(req.session.characterId);
        const characterData = await Character.findByPk(req.session.characterId);
        
        res.render('loading', { cards: handData, character: characterData, Gnome: gnomeData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// router.post('/submit-form', async (req, res) => {
//     try {
//         // Extract form data from the request body
//         const { username, password, email, characterName } = req.body;

//         // Create a new User entry
//         const newUser = await User.create({ username, password, email });

//         // Create a new Character entry associated with the user
//         const newCharacter = await Character.create({ name: characterName, UserId: newUser.id });

//         // Redirect the user to a confirmation page or any other page
//         res.redirect('/confirmation');
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to process the form submission' });
//     }
// });

// Route to handle the submission of the character name form
// router.post('/submit-character-name', async (req, res) => {
//     try {
//         const { characterName } = req.body; // Assuming the input field name for character name is 'characterName'

//         // Store the characterName in the session
//         req.session.characterName = characterName;

//         // Create a new character entry in the Character model
//         const newCharacter = await Character.create({ name: characterName });

//         // Render the loading-character handlebars file with the appropriate character name data
//         res.render('loading-character', { characterName });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

router.post('/submit-character-name', async (req, res) => {
    try {
        const { characterName } = req.body;
        const characterId = req.session.characterId; // Retrieve character ID from session
        // Find the existing character by ID and update its name
        const updatedCharacter = await Character.findByPk(characterId);
        if (updatedCharacter) {
            updatedCharacter.name = characterName;
            await updatedCharacter.save(); // Save the updated character
            res.render('loading-character', { characterName });
        } else {
            res.status(404).json({ error: 'Character not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/loading-character', async (req, res) => {
    try {
        const { class_id } = req.query;

        // Fetch the newly posted characterName data from the session or wherever it's stored
        const characterName = req.session.characterName; // Adjust this according to how you're storing the characterName
        
        // Fetch the same data as the /loading route
        const gnomeData = await Gnome.findByPk(class_id);
        const handData = await Hand.findByPk(req.session.characterId);
        const characterData = await Character.findByPk(req.session.characterId);
        console.log(characterName); // Log characterName to the console
        
        // Render the "loading-character" handlebars file and pass the fetched data
        res.render('loading-character', { cards: handData, character: characterData, Gnome: gnomeData, characterName: characterName });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//route to handle frontend request for a new set of 4 cards to generate and sends to handlebars file
router.get('/getcards', async (req, res) => {
    try {
        randomCards = getCards(deck);
        console.log(randomCards); // Log randomCards to the console
        res.render('game', { cards: randomCards });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//TODO: add route for selected card when it's clicked

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



