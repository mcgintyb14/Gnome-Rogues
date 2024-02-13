const router = require('express').Router();
const { getCards } = require('../../utils');
const { User, Character, Enemies, Gnome, Card, Hand, Deck, SavedGame } = require('../../models');
const multer = require('multer');
const upload = multer();

let randomCards;
let deck = [];

router.get('/loading', async (req, res) => {
    try {
        const { class_id } = req.query;
        const gnomeData = await Gnome.findByPk(class_id);
        res.render('loading', { Gnome: gnomeData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/submit-character-name/:class_id', upload.none(), async (req, res) => {
    try {
        const createdCharacter = await Character.create({
            name: req.body.name,
            class_id: req.params.class_id,
            current_hp: req.body.current_hp
        });

        const characterData = createdCharacter.get({plain: true});
        const classData = await Gnome.findByPk(characterData.class_id); 
        const allEnemies = await Enemies.findAll();
        const randomIndex = Math.floor(Math.random() * allEnemies.length);
        const enemyData = allEnemies[randomIndex];
        
        const savedGame = await SavedGame.create({
            character_id: characterData.id,
            character_name: characterData.name,
            class_id: characterData.class_id,
            character_current_hp: classData.MaxHP,
            enemy_id: randomIndex,
            enemy_current_hp: enemyData.hp
          });
    
        if (savedGame) {
            const gameData = savedGame.get({ plain: true });
            // res.status(200).send(plain)
            res.status(200).send({ gameId: gameData.id })
            // res.render('game', { game: gameData, character: characterData, enemy: enemyData, class: classData  })
        } else {
            res.status(404).json({ error: 'Character not found' });
        }
    } catch (err) {
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

router.post('/:id/attack', async (req, res) => {
    const card = req.body;
    const gameId = req.params.id;
    const model = await SavedGame.findByPk(gameId);
    const game = await model.get({ plain: true });
    const remainingHealth = game.enemy_current_hp - card.damage;
    model.enemy_current_hp = remainingHealth;
    await model.save();
    const gameAgain = await model.get({ plain: true });

    if (remainingHealth <= 0) {
        res.status(200).send('You have Slayed the gnenemy!')
    }
    res.status(200).send('ok')

    //TODO: calaculate enemy attack on player
    //decriment play's health
    //check if player still alive
    
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
