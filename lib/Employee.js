//Class created to perform sql operation
import {TableQuery} from "./TableQuery.js";

 class Employee extends TableQuery
 {
     
     constructor(){
        super();
         this.select = `SELECT * FROM employee;`;
         this.insert = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
         this.selectById = `SELECT * FROM employee WHERE id = ?`;
         this.delete =  `DELETE FROM employee WHERE id = ?`;
         this.update = `UPDATE employee set role_id =? where id= ?;`;
         this.selectByManager = `SELECT * FROM employee WHERE manager_id= ?;`;
         this.selectAllManagers =`SELECT DISTINCT mgr.* FROM employee mgr 
                                        join employee emp ON mgr.id = emp.manager_id;`
         this.selectByDepartment= `SELECT * FROM employee emp
                                            JOIN role rl ON rl.id = emp.role_id
                                             WHERE department_id = ?;`
     }    ;

     getEmployeeByManager()
     {
        return this.selectByManager;
     }

     getManagers()
     {
        return this.selectAllManagers;
     }

     getEmployeesByDepartment()
     {
        return this.selectByDepartment;
     }
 }

export {Employee}