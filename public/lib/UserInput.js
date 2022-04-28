//This class extends the questions class and does the actual dispay of the questions.
//Also handles responses to the questions.

import inquirer from 'inquirer';
import cTable from 'console.table';
import {getRoles,  createRole,deleteRole,  getDepartmentBudget} from '../js/role.js';
import {getDepartment,  createDepartment, deleteDepartment} from '../js/department.js';
import {getEmployee, createEmployee, deleteEmployee,  
         updateEmployee, getViewEmployeesByQuery}  from  '../js/employee.js';
import { questions } from './Questions.js';
import chalk from "chalk";

export class UserInput extends questions
{
    constructor()
    {        
        super();
    }  

    async intializeApp()
    {
       let {operation} = await  inquirer.prompt(this.options);
       
        switch(operation)
       {
           case 'Add Employee': 
                let {fname, lname, eRole, mgr} = await this.getAddEmployeeQuestions();
                let empPostData = { first_name : fname,
                    last_name: lname,
                    role_id : eRole.id,
                    manager_id : mgr.id};
                await createEmployee(empPostData);                
                this.intializeApp();
                break;
            case 'View all Employees':
                let eRows = await getEmployee();
                console.log('\n');
                console.log(cTable.getTable(eRows));
                this.intializeApp();
                break;
            case 'Update Employee Role':                 
                let {empUpdate, roleUpdate} = await this.getUpdateEmployeeQuestions();
                let empForUpdate = empUpdate.id;
                let roleForUpdate = {role_id : roleUpdate.id};
                await updateEmployee(empForUpdate, roleForUpdate);
                this.intializeApp();
                break;
            case 'Update Employee Managers':               
                let {empModify, mgrUpdate} = await this.getUpdateEmployeeMgrQuestions();
                let empForDeptUpdate = empModify.id;
                let mgrForUpdate = {manager_id : mgrUpdate.id};
                await updateEmployee(empForDeptUpdate, mgrForUpdate);
                this.intializeApp();
                break;
            case 'View Employees by Manager':                             
                let {manager} = await this.getViewEmployeesByManagerQuestion();
                let inputQuery = {
                    manager: true,
                    query : manager.id
                }
                let empOutput = await getViewEmployeesByQuery(inputQuery);
                console.log(cTable.getTable(empOutput));
                this.intializeApp();
                break;
            case 'View Employees by Department':
                let {depSelected} = await this.getViewEmployeesByDepartmentQuestion();
                let deptQuery = {
                    department: true,
                    query : depSelected.id
                }
                let deptOut = await getViewEmployeesByQuery(deptQuery);
                console.log(cTable.getTable(deptOut));
                this.intializeApp();
                break;
            case 'Delete employees':               
                let {emp}  = await this.getDeleteEmployeeQuestions();
                await deleteEmployee(emp.id);
                this.intializeApp();
                break;
            case 'View All Roles': 
                let rows = await getRoles();
                console.log(cTable.getTable(rows));
                this.intializeApp();
                break;
            case 'Add Role':                 
                let {title, salary, department} = await this.getAddRoleQuestions();
                let postData = { title : title,
                                salary: salary,
                                department_id : department.id};
                await createRole(postData);                
                this.intializeApp();
                break;
            case 'Delete roles':                 
                let {role} = await this.getDeleteRoleQuestions();
                await deleteRole(role.id);
                this.intializeApp();
                break;
            case 'View All Departments': //done
                let depts = await getDepartment();
                const depttb = cTable.getTable(depts);
                console.log(depttb);
                this.intializeApp();
                break;
            case 'View department used budget':                
                let {budget} = await this.getBudgetForDepartment();
                let budOutput = await getDepartmentBudget(budget.id);
                console.log(chalk.green(`Total utilized budget for department ${budget.name} is \$${budOutput[0].Budget}`));
                this.intializeApp();
                break;
            case 'Add Department':    //done
                let dept= await this.getAddDepartmentQuestions();
                let deptPostData = {name: dept.department};
                await createDepartment(deptPostData);            
                this.intializeApp();
                break;
            case 'Delete departments':                
                let {delDepartment} = await this.getDeleteDepartmentQuestions();
                await deleteDepartment(delDepartment.id);
                this.intializeApp();
                break;
            default:
                console.log("Thank You For Using Employee Manager!")
                break;
       }
    }

}

