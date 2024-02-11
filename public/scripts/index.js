// once land on game page - gnome/enemy data should populate into temp variables stored here. 
//That way, we do not have to keep making calls to the server during the game, other than refreshing new hand of cards.
//With those temp variables, we can do all of the game logic here.

//get cards is already a helper function. Can use that to shuffle the cards each turn.

let playedCard;
let gameCharacter;
let enemy;
// let gameDisplay;

class Enemy {
    constructor(id, name, attack, agility, hp, special_move) {
        this.id = id;
        this.name = name;
        this.attack = attack;
        this.agility = agility;
        this.currentHP = currentHP;
        this.special_move = special_move;
    }
}

class Character {
    constructor(id, className, name, maxHP, currentHP, strength, agility) {
        this.id =id;
        this.classID = classID;
        this.className = className;
        this.name = name;
        this.maxHP = maxHP;
        this.currentHP = currentHP;
        this.strength = strength;
        this.agility = agility;
    }
}

class Card {
    constructor(id, name, damage, dodge) {
        this.id = id;
        this.name = name;
        this.damage = damage;
        this.dodge = dodge;
    }
}

//TODO:
//add in endpoint to game.js route
const selectCard = async () => {
    fetch('http://localhost:3001/api/game/selectCard')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch selected card');
        }
        return response.json();
    })
    .then(data => {
        const cardData = data.card;
        if(cardData) {
            playedCard = new Card(
                cardData.id,
                cardData.name,
                cardData.damage,
                cardData.dodge
            )
        console.log(playedCard);
        return playedCard;
        } else {
            return null;
        }
    })
    .catch(error => {
        console.error('Error fetching selected card:', error);
        throw error;
    });
}

const getCharData = () => {
    //may need to change this route before deploy
    fetch(`http://localhost:3001/api/game/characterinfo/`)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network error');
        }
        return response.json();
    })
    .then(data => {

        const characterData = data.character;
        const enemyData = data.enemy;
        const classData = data.gnomeClass;

        if (characterData && classData) {
            gameCharacter = new Character(
                characterData.id,
                characterData.class_id,
                classData.class_name,
                characterData.name,
                classData.MaxHP,
                characterData.current_hp,
                classData.Strength,
                classData.Agility
            )
            console.log(gameCharacter);

        } else {
            console.log('Character data is null');
        }

        if (enemyData) {
            enemy = new Enemy(
                enemyData.id,
                enemyData.name,
                enemyData.attack,
                enemyData.agility,
                enemyData.hp,
                enemyData.special_move
            )
            console.log(enemy);
        } else {
            console.log('Enemy data is null');
        }
    })
    .catch(error => {
        console.error(error);
    });
}

//function to check if alive
const isAlive = (character) => {
    return character.currentHP > 0;
}

const enemyAttack = () => { 
    //TODO: add in some sort of % miss chance based on char agility + card block
    //TODO: calaculate if hit landed 
    const dmgToPlayer = enemy.attack - playedCard.dodge
    if (dmgToPlayer > 0) {
        gameCharacter.currentHP -= dmgToPlayer;
        if(!isAlive(gameCharacter)) {
            console.log("Game Over"); //store this in game display??
            return;
        }
    } else {
        console.log("dodged enemy attack!");
    }
    playerTurn();
}

const charAttack = () => {
    //TODO: add in % miss chance based on enemy agility
    //TODO: calaculate if hit landed
    const dmgToEnemy = playedCard.damage;
    if (dmgToEnemy > 0) {
        enemy.currentHP -= dmgToEnemy;
        if(!isAlive(enemy)) {
            console.log("Enemy defeated!"); //store this in game display??
            return;
        } 
    } else {
        console.log("Enemy dodged your attack!")
    } 
    enemyTurn();
}

//playerTurn is performed only when a card is selected
const playerTurn = async () => {
    let selectedCard = await selectCard();
    charAttack(selectedCard);
}

const enemyTurn = () => {
    enemyAttack();
    //TODO: add in function to trigger new cards for the player if they are still alive (possibly into enemy attack)
}


const startGame = () => {
    getCharData()
    console.log("Game started.");
    playerTurn();
}

startGame();
//at end of round, send any relevant game data to the database

