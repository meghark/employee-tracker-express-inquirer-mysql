//Class created to perform sql operations on all employee table.
//The class inherits common methods from TableQuery
import {TableQuery} from "./TableQuery.js";

 class Employee extends TableQuery
 {
     
     constructor(){
        super();
        this.commonSelectFields =`SELECT emp.id, emp.first_name, emp.last_name, 
                        rl.title,dp.name as department, rl.salary,
                        concat(mgr.first_name ," " ,mgr.last_name) as manager
                        FROM employee emp 
                        left join role rl on emp.role_id = rl.id 
                        left join department dp on dp.id = rl.department_id
                        left join employee mgr on emp.manager_id = mgr.id`;
         this.select = `${this.commonSelectFields};`;
         this.insert = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
         this.selectById = `${this.commonSelectFields} WHERE id = ?;`;
         this.delete =  `DELETE FROM employee WHERE id = ?`;
         this.update = `UPDATE employee set role_id =? where id= ?;`;
         this.updateByMgr = `UPDATE employee set manager_id =? where id= ?;`;
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

     getUpdateByManager()
     {
        return this.updateByMgr;
     }
 }

export {Employee}