// This command file will be used to run the console application.
// And will act as the frontend.

import {UserInput} from './public/lib/UserInput.js';
import figlet from "figlet";

//Displays a the title in special format
console.log(figlet.textSync('Employee Tracker', {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 100,
    whitespaceBreak: true
}));

const userInput = new UserInput();
console.log("\n")
await userInput.intializeApp();
