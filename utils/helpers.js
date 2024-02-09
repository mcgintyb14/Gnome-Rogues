// Get the card_ids from the handData
const getCards = (deck) => {
    const randomCards = [];

    for (let i = 0; i < 4; i++) {
        const randomCardIndex = Math.floor(Math.random() * deck.length);
        randomCards.push(deck[randomCardIndex]);
    }
    return randomCards;
}

module.exports = { getCards }