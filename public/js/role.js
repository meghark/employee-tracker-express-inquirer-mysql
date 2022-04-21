import fetch from "node-fetch";
const roleUrl = 'http://localhost:3002/api/roles';

const getRoles = () => {   
    return fetch(roleUrl);   
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
    console.log(result.message);
};

const deleteRole = (id) => {
    return fetch(`${roleUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

};



export {getRoles, getRolesById, createRole, deleteRole};