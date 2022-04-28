//Class created to perform sql operation
const TableQuery = require('./TableQuery);

 Class Employee extends TableQuery
 {
     constructor(){
         this.commonSelectFields =`SELECT emp.id as Id, emp.first_name as FirstName, emp.last_name as LastName, 
                        rl.title as 'Job Title' ,dp.name as 'Department',rl.salary,
                        mgr.first_name +" " +mgr.last_name as 'Manager'
                        FROM employee emp 
                        left join role rl on emp.role_id = rl.id 
                        left join dep dp on dp.id = rl.department_id
                        left join employee mgr on emp.manager_id = emp.id`;
         this.select = `${this.commonSelectFields};`;
         this.insert = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
         this.selectById = `${this.commonSelectFields} WHERE id = ?;`;
         this.delete =  `DELETE FROM department WHERE id = ?`;
     }    
 }

 module.exports = Employee;