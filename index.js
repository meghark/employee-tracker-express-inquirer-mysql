import {UserInput} from './public/lib/UserInput.js';



console.table({name: 'Employee Manager'});

const userInput = new UserInput();

await userInput.intializeApp();
//  async function  role() { 
//     let rl =      await userInput.callApi();  
//     let data = await rl.json();
//     return data;    
// } ;

// let output = await role();
// const tb= cTable.getTable(output.data);
// console.log(tb);
