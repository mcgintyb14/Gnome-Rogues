const router = require('express').Router();
const { getCards } = require('../../utils/helpers');
const { User, Character, Enemies, Gnome, Card, Hand, Deck } = require('../../models');

var randomCards;

router.get('/', async (req, res) => {
    try {
        const allEnemies = await Enemies.findAll();
        const randomIndex = Math.floor(Math.random() * allEnemies.length);
        const randomEnemy = allEnemies[randomIndex];

        //TODO: add below back in once session is working
        // const characterData = await Character.findByPk(req.session.characterId);
        const characterData = await Character.findByPk(1);
        const classData = await Gnome.findByPk(characterData.class_id); 
        
        // const handData = await Hand.findByPk(req.session.characterId);
        
        //TODO: plugged in temp class_id and character id. Need to re-link.
        const deckData = await Deck.findAll( {
            where: {
                class_id: characterData.class_id
            }
        });

        const deck = deckData.map((deck) => deck.get({ plain: true }));
        const randomCards = getCards(deck);

        console.log(randomCards);

        // console.log(getCards(deck));
        // randomCards = getCards(handData);
        // console.log(randomCards);

        // Get the card_ids from the handData
        // const cardIds = handData ? handData.card_ids : [];

        // const randomCards = [];
        // for (let i = 0; i < 4; i++) {
        //     const randomCardIndex = Math.floor(Math.random() * cardIds.length);
        //     randomCards.push(cardIds[randomCardIndex]);
        // }

        res.render('game', { enemy: randomEnemy, cards: randomCards, character: characterData });

        //sending data to frontend
        res.json({ enemy: randomEnemy, character: characterData, gnomeClass: classData });
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
        // This is a placeholder for when we have a "game" handlebars file to render, which will render a random enemy to face using the random enemy data we are passing here
        res.render('game', { enemy: randomEnemy, cards: randomCards, character: characterData });

        //sending data to frontend
        res.json({ enemy: randomEnemy, character: characterData, gnomeClass: classData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router