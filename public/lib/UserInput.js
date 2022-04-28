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
        this.rows='';
        this.returnMessage= '';
       
    }  

    //This function will be used to print responses for the actions the user has selected.
    //If its a list of records , it will print a datatable.
    //If its a confirmation messsage it will print the appropraite message.
    async printMessage(data)
    {
        console.log('\n');
        if(data)
        {
            console.log(cTable.getTable(this.rows));
        }
        else
        {
            console.log(chalk.blue(this.returnMessage.message));    
        }
        console.log('\n');
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
                this.returnMessage = await createEmployee(empPostData); 
                await this.printMessage(false);                       
                this.intializeApp();
                break;
            case 'View all Employees':
                this.rows = await getEmployee();
                await this.printMessage(true);  
                this.intializeApp();
                break;
            case 'Update Employee Role':                 
                let {empUpdate, roleUpdate} = await this.getUpdateEmployeeQuestions();
                let empForUpdate = empUpdate.id;
                let roleForUpdate = {role_id : roleUpdate.id};
                this.returnMessage = await updateEmployee(empForUpdate, roleForUpdate);
                this.printMessage(false);
                this.intializeApp();
                break;
            case 'Update Employee Managers':               
                let {empModify, mgrUpdate} = await this.getUpdateEmployeeMgrQuestions();
                let empForDeptUpdate = empModify.id;
                let mgrForUpdate = {manager_id : mgrUpdate.id};
                this.returnMessage= await updateEmployee(empForDeptUpdate, mgrForUpdate);
                this.printMessage(false);
                this.intializeApp();
                break;
            case 'View Employees by Manager':                             
                let {manager} = await this.getViewEmployeesByManagerQuestion();
                let inputQuery = {
                    manager: true,
                    query : manager.id
                }
                this.rows = await getViewEmployeesByQuery(inputQuery);
                this.printMessage(true);
                this.intializeApp();
                break;
            case 'View Employees by Department':
                let {depSelected} = await this.getViewEmployeesByDepartmentQuestion();
                let deptQuery = {
                    department: true,
                    query : depSelected.id
                }
                this.rows = await getViewEmployeesByQuery(deptQuery);
                this.printMessage(true);
                this.intializeApp();
                break;
            case 'Delete employees':               
                let {emp}  = await this.getDeleteEmployeeQuestions();
                this.returnMessage = await deleteEmployee(emp.id);
                this.printMessage(false);
                this.intializeApp();
                break;
            case 'View All Roles': 
                this.rows = await getRoles();
                this.printMessage(true);
                this.intializeApp();
                break;
            case 'Add Role':                 
                let {title, salary, department} = await this.getAddRoleQuestions();
                let postData = { title : title,
                                salary: salary,
                                department_id : department.id};
                this.returnMessage= await createRole(postData);   
                this.printMessage(false);             
                this.intializeApp();
                break;
            case 'Delete roles':                 
                let {role} = await this.getDeleteRoleQuestions();
                this.returnMessage= await deleteRole(role.id);
                this.printMessage(false);
                this.intializeApp();
                break;
            case 'View All Departments': //done
                this.rows = await getDepartment();
                this.printMessage(true);
                this.intializeApp();
                break;
            case 'View department used budget':                
                let {budget} = await this.getBudgetForDepartment();
                let budOutput = await getDepartmentBudget(budget.id);
                console.log('\n');
                console.log(chalk.green(`Total utilized budget for department ${budget.name} is \$${budOutput[0].Budget}`));
                console.log('\n');
                this.intializeApp();
                break;
            case 'Add Department':    //done
                let dept= await this.getAddDepartmentQuestions();
                let deptPostData = {name: dept.department};
                this.returnMessage= await createDepartment(deptPostData);  
                this.printMessage(false);          
                this.intializeApp();
                break;
            case 'Delete departments':                
                let {delDepartment} = await this.getDeleteDepartmentQuestions();
                this.returnMessage= await deleteDepartment(delDepartment.id);
                this.printMessage(false);   
                this.intializeApp();
                break;
            default:
                console.log("Thank You For Using Employee Manager!")
                break;
       }
    }

}

