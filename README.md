# Gnome-Rogues
Project Link:

## Description
This project is a web-based game where players can choose their gnome class and engage in battles with various enemies. Built with Express.js and Handlebars, it offers a dynamic and interactive gaming experience.

## Features

- Choose from three gnome classes and enter your own character name.
- Engage in battles with randomly generated enemies.
- Strategy-based card system for battles.
- Session-based user experience.

## Installation
To run this project, you will need Node.js and npm installed on your system.

1. Clone the repository:
   git clone https://github.com/mcgintyb14/gnome-rogues.git
2. Navigate to the project directory:
   cd gnome-rogues
3. Install dependencies:
   npm install
4. Set up the database by running the migrations (make sure to configure your database in config/connection.js):
   npm run migrate
5. Seed the database with initial data:
   npm run seed
6. Start the server:
   npm start
## Usage
After starting the server, navigate to http://localhost:3001 in your web browser to start the game.

Choose Your Gnome Class: Select a gnome class and name your Character to begin your adventure.
Battle: Engage in battles and use cards from your hand to defeat enemies.

## Acknowledgements
- Node.js
- Express.js
- Handlebars.js
- Sequelize
- bcrypt
- connect-session-sequelize
- dotenv
- eslint-config-airbnb
- mysql2
- multer


## Credits
Special thanks to Austin Dubina (github.com/mankee) for helping debug our routing logic.

## License
Please see MIT License attached to this project.
