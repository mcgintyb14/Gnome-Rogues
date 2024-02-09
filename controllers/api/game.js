const router = require('express').Router();
const { User, Character, Enemies, Gnome, Card, Hand, Deck } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const allEnemies = await Enemies.findAll();

        const randomIndex = Math.floor(Math.random() * allEnemies.length);

        const randomEnemy = allEnemies[randomIndex];

        const handData = await Hand.findByPk(req.session.characterId);

        // Get the card_ids from the handData
        const cardIds = handData ? handData.card_ids : [];

        const randomCards = [];
        for (let i = 0; i < 4; i++) {
            const randomCardIndex = Math.floor(Math.random() * cardIds.length);
            randomCards.push(cardIds[randomCardIndex]);
        }

        const characterData = await Character.findByPk(req.session.characterId);
        
        // This is a placeholder for when we have a "game" handlebars file to render, which will render a random enemy to face using the random enemy data we are passing here
        res.render('game', { enemy: randomEnemy, cards: randomCards, character: characterData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router

