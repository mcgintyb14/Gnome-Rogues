// once land on game page - gnome/enemy data should populate into temp variables stored here. 
//That way, we do not have to keep making calls to the server during the game, other than refreshing new hand of cards.
//With those temp variables, we can do all of the game logic here.

//get cards is already a helper function. Can use that to shuffle the cards each turn.

//import playedCard data
const playedCard = require()

//set variable to use for loading text content regarding the game battle
let gameDisplay;

//Store class starting data
const gameCharacter = {
    id: this.id,
    charClass: this.class_name,
    name: this.name, //need to pull in name from loading page
    maxHP: this.MaxHP,
    currentHP: this.MaxHP,
    Strength: this.Strength,
    Agility: this.Agility,
    Image: this.Image,
    Type: this.Type,

    //fetch data to store in this object
    //need current character id to fetch appropriate data
    
}


//Store enemy starting data
const enemy = {
    id: this.id,
    attack: this.attack,
    agility: this.agility,
    maxHP: this.hp,
    currentHP: this.hp,
    move: this.special_move,
    name: this.name
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



//at end of round, send any relevant game data to the database

