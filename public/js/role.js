//All api calls to departments route are handled below.
//Using node-fetch package to make calls. 
//using dotenv for enviroment variables
//Chalk to display messages in various colors

import fetch from "node-fetch";
import chalk from "chalk";
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.URL;
const roleUrl = `${url}/api/roles`;
const budgetUrl = `${url}/api/budget`;

//Get all roles
const getRoles = async () => {   
    let result = await fetch(roleUrl);  
    let {data} = await result.json();    
    return data;
};

//Get a role by id.
const getRolesById= (id) => {   
    return fetch(`${roleUrl}/${id}`);   
};

//Add a role
const createRole = async (newRole) => {
    let reponse = await fetch(roleUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRole),
    })
    let result = await reponse.json();
    console.log(chalk.blue(result.message));
};

//Delete a role
const deleteRole = async (id) => {
    let response = await fetch(`${roleUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    let {message} = await response.json();
    console.log(chalk.blue(message));
};

//The following method returns a list of role names only. 
//This method will be used to provide a list of available roles to choose from at the command prompt.
const getRolesForChoices = async() => {
    let rows = await getRoles();
    let roleChoices =[];

    rows.forEach(role => {
        let current = {
            name:  role.title,
            value : role        
        }
        roleChoices.push(current);
    });
    return roleChoices;
}

//Gets a departments budget.
const getDepartmentBudget = async (id) => {   
    let result = await fetch(`${budgetUrl}/${id}`);  
    let {data} = await result.json();    
    return data;
};

export {getRoles, getRolesById, createRole, deleteRole, getRolesForChoices, getDepartmentBudget };