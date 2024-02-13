const { Card } = require('../models');


const getCardByID = async (id) => {
    let cardData = await Card.findByPk(id)
    const card = cardData.get({ plain: true });
    return card;
}

const getCards = async (deck) => {
    const randomCards = new Set();
    while(randomCards.size < 4) {
        const randomCardIndex = Math.floor(Math.random() * deck.length);
        let newCard = await getCardByID(deck[randomCardIndex].card_id)
        randomCards.add(newCard);
    }
    const currentCards = Array.from(randomCards);
    // console.log(currentCards);
    return currentCards;
 }
 
 module.exports = { getCards }