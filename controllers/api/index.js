const router = require('express').Router();
const gameRoutes = require('./game');

router.use('/game', gameRoutes);

module.exports = router;
