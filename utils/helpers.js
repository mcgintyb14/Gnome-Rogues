const { Card } = require('../models');

// Get the card_ids from the handData
// const getCards = (deck) => {
//     const randomCards = [];

//     for (let i = 0; i < 4; i++) {
//         const randomCardIndex = Math.floor(Math.random() * deck.length);
//         randomCards.push(deck[randomCardIndex]);
//     }
//     return randomCards;
// }

// module.exports = { getCards }

// helpers.js
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
    console.log(randomCards)
    return Array.from(randomCards);
 }
 
 module.exports = { getCards }