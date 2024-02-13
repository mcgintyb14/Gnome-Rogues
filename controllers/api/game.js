const router = require('express').Router();
const { getCards } = require('../../utils/helpers');
const { User, Character, Enemies, Gnome, Card, Hand, Deck, SavedGame } = require('../../models');
// const { generateUniqueId } = require('../../utils/uniequeid');
const multer = require('multer');
const upload = multer();

let randomCards;
let deck = [];

// router.get('/:id', async (req, res) => {
//     try {
//         debugger
//         const character = await Character.findByPk(req.query.class_id);
//         const classData = await Gnome.findByPk(character.class_id);
//         const allEnemies = await Enemies.findByPk();

    
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

router.get('/loading', async (req, res) => {
    try {
        const { class_id } = req.query;

        // const characterId = generateUniqueId(); 
        // req.session.characterId = characterId;

        const gnomeData = await Gnome.findByPk(class_id);

        // const handData = await Hand.findByPk(req.session.characterId);
        // const characterData = await Character.findByPk(req.session.characterId);
        
        res.render('loading', { Gnome: gnomeData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/submit-character-name/:class_id', upload.none(), async (req, res) => {
    try {
        // const { characterName } = req.body;
        // const characterId = req.session.characterId; // Retrieve character ID from session
        // Find the existing character by ID and update its name
        // const updatedCharacter = await Character.findByPk(characterId);
        const createdCharacter = await Character.create({
            name: req.body.name,
            class_id: req.params.class_id,
            current_hp: req.body.current_hp
        });
        const character = createdCharacter.get({plain: true})
        // const newChar = character.findByPk(character.id, {include: [{model: Character}]});
        // const charData = character.get({plain: true});
        const classData = await Gnome.findByPk(character.class_id); 
        const allEnemies = await Enemies.findAll();
        const randomIndex = Math.floor(Math.random() * allEnemies.length);
        const randomEnemy = allEnemies[randomIndex];
        
        const game = await SavedGame.create({
            character_id: character.id,
            character_name: character.name,
            class_id: character.class_id,
            character_current_hp: classData.MaxHP,
            enemy_id: randomIndex,
            enemy_current_hp: randomEnemy.hp
          });
        if (game) {
            // updatedCharacter.name = characterName;
            // await updatedCharacter.save(); // Save the updated character
            // res.render('game', { character });
            res.status(200).send({ gameId: game.id })
        } else {
            res.status(404).json({ error: 'Character not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// router.get('/loading-character', async (req, res) => {
//     try {
//         debugger
//         console.log("landed in this route");
//         const class_id = req.query.class_id;
//         // Fetch the newly posted characterName data from the session or wherever it's stored
//         // const characterName = req.session.characterName; // Adjust this according to how you're storing the characterName
        
//         // Fetch the same data as the /loading route
//         const gnomeData = await Gnome.findByPk(class_id);
//         const handData = await Hand.findByPk(req.session.characterId);
//         const characterData = await Character.findByPk(req.session.characterId);
//         console.log(characterName); // Log characterName to the console
        
//         // Render the "loading-character" handlebars file and pass the fetched data
//         res.render('loading-character', { cards: handData, character: characterData, Gnome: gnomeData, characterName: characterName });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


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

router.post('/selectCard/', (req, res) => {
    console.log(req.body);

})
//sending data to frontend
//         res.json({ enemy: randomEnemy, character: characterData, gnomeClass: classData });

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
