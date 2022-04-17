//Class created to perform sql operation
const TableQuery = require("./TableQuery");

 class Employee extends TableQuery
 {
     constructor(){
         this.select = `SELECT * FROM employee;`;
         this.insert = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
         this.selectById = `SELECT * FROM employee WHERE id = ?`;
         this.delete =  `DELETE FROM department WHERE id = ?`;
     }    
 }

 module.exports = Employee;