//All api calls to departments route are handled below.
//Using node-fetch package to make calls. 
//using dotenv for enviroment variables
import fetch from "node-fetch";
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.URL;
const roleUrl = `${url}/api/departments`;

//Fetch all departments
const getDepartment = async () => {   
    let result = await fetch(roleUrl);   
    let {data} = await result.json();
    return data;
};

//Fetch a department by user provided id
const getDepartmentById= (id) => {   
    return fetch(`${roleUrl}/${id}`);   
};

//Add a new department
const createDepartment= async (dept) => {
    let respone = await fetch(roleUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dept),
    })

    let result = await respone.json();
    console.log(result.message);
};

//Delete a new department
const deleteDepartment =async (id) => {
    let respone = await fetch(`${roleUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    let {message} = await respone.json();
    console.log(message);
};

//The following method returns a list of department names only. 
//This method will be used to provide a list of available departments to choose from at the command prompt.
const getDepartmentForChoices = async () => {
    let respone = await getDepartment();
   let deptChoices =[];

   respone.forEach(department => {
            let current = {
                name: department.name,
                value: department
            }

            deptChoices.push(current);
    });

    return deptChoices;
}


export {getDepartment, getDepartmentById, createDepartment, deleteDepartment, getDepartmentForChoices};