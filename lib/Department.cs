//Class created to perform sql operation
const TableQuery = require('./TableQuery);

 Class Department extends TableQuery
 {
     constructor(){
         this.select = `SELECT * FROM Department;`;
         this.insert = `INSERT INTO department(name) VALUES (?);`;
         this.selectById = `SELECT * FROM department WHERE id = ?`;
         this.delete =  `DELETE FROM department WHERE id = ?`;
     }    
 }

 module.exports = Department;