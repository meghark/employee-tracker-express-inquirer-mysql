//Class created to perform sql operation
const TableQuery = require('./TableQuery');

 class Role extends TableQuery
 {
     constructor(){
         this.select = `SELECT * FROM role;`;
         this.insert = `INSERT INTO role(title, salary, department_id) VALUES (?,?,?);`;
         this.selectById = `SELECT * FROM role WHERE id = ?`;
         this.delete =  `DELETE FROM role WHERE id = ?`;
         
     }    
 }

 module.exports = Role;