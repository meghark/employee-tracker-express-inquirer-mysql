import fetch from "node-fetch";
const roleUrl = 'http://localhost:3002/api/departments';

const getDepartment = () => {   
    return fetch(roleUrl);   
};

const getDepartmentById= (id) => {   
    return fetch(`${roleUrl}/${id}`);   
};

const createDepartment= (newRole) => {
    return fetch(roleUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRole),
    })
};

const deleteDepartment = (id) => {
    return fetch(`${roleUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

};

const getDepartmentForChoices = async () => {
    let respone = await getDepartment();
    let {data} = await respone.json();
    console.log(data);
    let deptChoices =[];

    data.forEach(department => {
            let current = {
                name: department.name,
                value: department
            }

            deptChoices.push(current);
    });

    return deptChoices;
}


export {getDepartment, getDepartmentById, createDepartment, deleteDepartment, getDepartmentForChoices};