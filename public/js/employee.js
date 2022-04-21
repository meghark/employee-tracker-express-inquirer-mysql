import fetch from "node-fetch";
const roleUrl = 'http://localhost:3002/api/employees';
const mgrUrl = 'http://localhost:3002/api/manager';

const getEmployee =async () => {
    let result = await fetch(roleUrl);   
    let {data} = await result.json();
    return data;
};

const createEmployee = async (emp) => {
    let respone = await fetch(roleUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emp),
    })

    let result = await respone.json();
    console.log(result.message);
};

const deleteEmployee = async (id) => {
    let respone = await fetch(`${roleUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    let {message} = await respone.json();
    console.log(message);
};

const getManagers = async() => {
    let result = await fetch(mgrUrl);   
    let {data} = await result.json();
    let mgrChoices =[];

    data.forEach(mgr => {
        let current = {
            name: `${mgr.first_name} ${mgr.l}`,
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


const updateEmployee =() => {

};


const getEmployeeByManager =() => {

};

const getEmployeeByDepartment =() => {

};

export {getEmployee, createEmployee, deleteEmployee, getManagers, getEmployeesForChoices};