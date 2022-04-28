//Class created to perform sql operations on all role table.
//The class inherits common methods from TableQuery
import {TableQuery} from "./TableQuery.js";

 class Role extends TableQuery
 {
    
     constructor(){
        super();
         this.select = `SELECT * FROM role;`;
         this.insert = `INSERT INTO role(title, salary, department_id) VALUES (?,?,?);`;
         this.selectById = `SELECT * FROM role WHERE id = ?`;
         this.delete =  `DELETE FROM role WHERE id = ?`;
         
         //To get a departments used budget, find all employees in that department.
         //This has to be done via a join with roles table.
         //Sum salaries for all employees using salary available in role table.         
         this.deptBudget = `SELECT SUM(salary) as Budget FROM role join employee on employee.role_id = role.id WHERE department_id = ?`
         
     }    ;

     getDepartmentBudget(){
        return this.deptBudget;
    }
 }

export {Role}