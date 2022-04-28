//All api calls to departments route are handled below.
//Using node-fetch package to make calls. 
//using dotenv for enviroment variables
//Chalk to display messages in various colors

import fetch from "node-fetch";
import chalk from "chalk";
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.URL;
const empUrl = `${url}/api/employees`;
const mgrUrl = `${url}/api/manager`;

//Get all employees
const getEmployee =async () => {
    let result = await fetch(empUrl);   
    let {data} = await result.json();
    return data;
};

//create a new employee
const createEmployee = async (emp) => {
    let respone = await fetch(empUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emp),
    })

    let result = await respone.json();
    return result;   
};

//Delete an employee
const deleteEmployee = async (id) => {
    let respone = await fetch(`${empUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    let result = await respone.json();
    return result;
};

//Get a list of employees who are managers
const getManagers = async() => {
    let result = await fetch(mgrUrl);   
    let {data} = await result.json();
    let mgrChoices =[];

    data.forEach(mgr => {
        let current = {
            name: `${mgr.first_name} ${mgr.last_name}`,
            value: mgr
        }
        mgrChoices.push(current);
    });

    return mgrChoices;
};

//The following method returns a list of emplpoyee names only. 
//This method will be used to provide a list of available employees to choose from at the command prompt.
const getEmployeesForChoices = async() => {
    let result = await getEmployee();   
    let empChoices =[];

    result.forEach(emp => {
        let current = {
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp
        }
        empChoices.push(current);
    });

    return empChoices;
};

//Update an employee record
const updateEmployee = async(id, newvalues) => {
    let response = await fetch(`${empUrl}/${id}`,{
        method : 'PUT',
        headers: {
            'Content-Type' : 'application/json',            
        },
        body: JSON.stringify(newvalues)
    })

    let result = await response.json();
    return result;   
};


//Get all employees by query parameters
const getViewEmployeesByQuery =async (query) => {
    let currentUrl ='';
  
    if(query.manager)
    {
         currentUrl=`${empUrl}?manager=${query.query}`;
    }
    else if(query.department)
    {
        currentUrl = `${empUrl}?department=${query.query}`;
    }
    
    let reponse = await fetch(currentUrl);
    let {data} = await reponse.json();
    return data;
};

export {getEmployee, createEmployee, deleteEmployee, getManagers, getEmployeesForChoices, updateEmployee, getViewEmployeesByQuery};