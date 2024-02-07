const User = require('./User');
const Character = require('./Character');
const Enemy = require('./Enemy');
let apples;

User.hasOne(Character, {});

Character.belongsTo(User, {});

module.exports = { User, Character };
