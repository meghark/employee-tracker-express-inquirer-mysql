import fetch from "node-fetch";
import chalk from "chalk";
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.URL;
const empUrl = `${url}/api/employees`;
const mgrUrl = `${url}/api/manager`;

const getEmployee =async () => {
    let result = await fetch(empUrl);   
    let {data} = await result.json();
    return data;
};

const createEmployee = async (emp) => {
    let respone = await fetch(empUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emp),
    })

    let result = await respone.json();
    console.log(chalk.blue(result.message));
};

const deleteEmployee = async (id) => {
    let respone = await fetch(`${empUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    let {message} = await respone.json();
    console.log(chalk.blue(message));
};

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

const updateEmployee = async(id, newrole) => {
    console.log(id, newrole);
    let response = await fetch(`${empUrl}/${id}`,{
        method : 'PUT',
        headers: {
            'Content-Type' : 'application/json',            
        },
        body: JSON.stringify(newrole)
    })

    let result = await response.json();
    console.log(chalk.blue(result.message));
};


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