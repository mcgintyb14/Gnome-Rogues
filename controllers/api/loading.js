const router = require('express').Router();
const { Character, Hand } = require('../../models');

router.get('/loading', async (req, res) => {
    try {
        const handData = await Hand.findByPk(req.session.characterId);

        const characterData = await Character.findByPk(req.session.characterId);
        
        res.render('loading', { cards: handData, character: characterData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router
