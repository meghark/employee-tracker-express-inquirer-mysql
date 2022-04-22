import {UserInput} from './public/lib/UserInput.js';
import figlet from "figlet";


console.log(figlet.textSync('Employee Tracker', {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 100,
    whitespaceBreak: true
}));

const userInput = new UserInput();
console.log("\n")
await userInput.intializeApp();
