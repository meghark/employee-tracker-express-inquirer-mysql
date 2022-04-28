
import fetch from "node-fetch";
dotenv.config();

const url = process.env.URL;

const roleUrl = `${url}/api/departments`;

const getDepartment = async () => {   
    let result = await fetch(roleUrl);   
    let {data} = await result.json();
    return data;
};

const getDepartmentById= (id) => {   
    return fetch(`${roleUrl}/${id}`);   
};

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