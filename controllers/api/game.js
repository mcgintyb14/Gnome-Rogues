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

        const randomNumber = Math.floor(Math.random() * allEnemies.length)
        const enemyData = allEnemies[randomNumber];
        
        const savedGame = await SavedGame.create({
            character_id: characterData.id,
            character_name: characterData.name,
            class_id: characterData.class_id,
            character_current_hp: classData.MaxHP,
            enemy_id: enemyData.id,
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
    const enemy = await Enemies.findByPk(game.enemy_id);

    enemyDamage = enemy.attack;
    const enemyRemainingHealth = game.enemy_current_hp - card.damage;
    const characterRemainingHealth = game.character_current_hp - enemyDamage

    let gameMessage;
    if (enemyRemainingHealth <= 0) {
        gameMessage = 'You have Slayed the gnenemy!';
    }

    if (characterRemainingHealth < 0) {
        gameMessage = 'dun dun dun... dead.';
    }


    model.set({
        character_current_hp: characterRemainingHealth,
        enemy_current_hp: enemyRemainingHealth,
        game_message: gameMessage,
    })

    await model.save();

    const gameThree = await model.get({ plain: true });
    debugger
    res.status(200).send('ok');
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
