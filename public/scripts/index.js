// once land on game page - gnome/enemy data should populate into temp variables stored here. 
//That way, we do not have to keep making calls to the server during the game, other than refreshing new hand of cards.
//With those temp variables, we can do all of the game logic here.

//get cards is already a helper function. Can use that to shuffle the cards each turn.

//import playedCard data
let playedCard;

//set variable to use for loading text content regarding the game battle
let gameDisplay;

class Enemy {
    constructor(id, name, attack, agility, hp, special_move) {
        this.id = id;
        this.name = name;
        this.attack = attack;
        this.agility = agility;
        this.hp = hp;
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
            const gameCharacter = new Character(
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
            const enemy = new Enemy(
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
const isAlive = () => {
    if (this.currentHP <= 0) {
        console.log(`${this.name} has been defeated!`);
        return false;
      }
      return true;
}

const enemyAttack = (enemy, playedCard) => { //need previously played card
    gameCharacter.currentHP -= enemy.attack - card.dodge //add in some sort of % miss chance based on char agility + card block
    //add logic for game display depending on if the hit landed 
}

//await the player to select a card, then trigger enemy turn
const enemyTurn = setInterval(() => {
    let totalTime = 0;
    if (totalTime <= 1000) {
        gameDisplay = "Enemy turn";
    }
    if (totalTime > 1000 && totalTime < 5000) {
        enemyAttack(enemy, playedCard);
    }

    //should be several seconds to give to player time to see what is happening
    
    //at 5 secs, display player turn
    if (totalTime >= 5000) {
        console.log("Player Turn");
    }
    //at end of 6 secs, goes back to waiting for player to select their next card
}, 6000);


getCharData();
//at end of round, send any relevant game data to the database

