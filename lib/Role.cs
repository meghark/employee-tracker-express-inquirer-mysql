//Class created to perform sql operation
const TableQuery = require('./TableQuery);

 Class Role extends TableQuery
 {
     constructor(){
         this.commonSelect =  `SELECT rl.title as 'Job Title', rl.id,dep.name as department ,rl.salary  
                                FROM role rl 
                                left join department dep on dep.id = rl.department_id`;
         this.select = `${this.commonSelect};`;
         this.insert = `INSERT INTO role(title, salary, department_id) VALUES (?,?,?);`;
         this.selectById = `${this.commonSelect} WHERE id = ?`;
         this.delete =  `DELETE FROM role WHERE id = ?`;
     }    
 }

 module.exports = Role;