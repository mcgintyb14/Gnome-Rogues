const router = require('express').Router();
const { User, Character, Enemies, Gnome, Card, Hand, Deck } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const allEnemies = await Enemies.findAll();

        const randomIndex = Math.floor(Math.random() * allEnemies.length);

        const randomEnemy = allEnemies[randomIndex];
        
        // This is a placeholder for when we have a "game" handlebars file to render, which will render a random enemy to face using the random enemy data we are passing here
        res.render('game', { enemy: randomEnemy });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router

