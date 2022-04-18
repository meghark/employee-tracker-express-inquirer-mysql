const UserInput = require('./public/lib/UserInput');
const cTable = require('console.table');

console.table({name: 'Employee Manager'});

const userInput = new UserInput();

userInput.intializeApp();