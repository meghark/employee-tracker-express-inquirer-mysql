//Class created to perform sql operation
const TableQuery = require('./TableQuery');

 class Department extends TableQuery
 {
    
     constructor(){
        super();
         this.select = `SELECT * FROM Department;`;
         this.insert = `INSERT INTO department(name) VALUES (?);`;
         this.selectById = `SELECT * FROM department WHERE id = ?`;
         this.delete =  `DELETE FROM department WHERE id = ?`;
     }    
 }

 module.exports = Department;