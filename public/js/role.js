import fetch from "node-fetch";
import chalk from "chalk";
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.URL;
const roleUrl = `${url}/api/roles`;
const budgetUrl = `${url}/api/budget`;


const getRoles = async () => {   
    let result = await fetch(roleUrl);  
    let {data} = await result.json();    
    return data;
};

const getRolesById= (id) => {   
    return fetch(`${roleUrl}/${id}`);   
};

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

const getDepartmentBudget = async (id) => {   
    let result = await fetch(`${budgetUrl}/${id}`);  
    let {data} = await result.json();    
    return data;
};

export {getRoles, getRolesById, createRole, deleteRole, getRolesForChoices, getDepartmentBudget };