import inquirer from 'inquirer';
import cTable from 'console.table';
import {getRoles, getRolesById, createRole,deleteRole, getRolesForChoices} from '../js/role.js';
import {getDepartment, getDepartmentById, createDepartment, deleteDepartment, getDepartmentForChoices} from '../js/department.js';
import { listItem } from 'taiko';

export class UserInput
{
    
    constructor()
    {
        this.departments =[];
        this.employees =['emp1', 'emp2'];
        this.roles=['q','e'];
        this.options=[{type: 'list',
                          name : 'operation',
                          message: 'What would you like to do?',
                          choices: ['View all Employees','Add Employee', 'Update Employee Role','Update Employee Managers',
                                    'View Employees by Manager', 'View Employees by Department','Delete employees',
                                    'View All Roles', 'Add Role', 'Delete roles',
                                    'View All Departments','View department budget','Add Department', 'Delete departments', 'Quit']}];
        this.addDepartment = [{type: 'prompt',
        name : 'department',
        message: 'What is the name of the department?'}];

        

        this.addEmployee = [
            { 
                type: 'prompt',
                name: 'fname',
                message: "What is the employee's first name?"
            },
            {type: 'prompt',
            name: 'lanme',
            message: "What is the employee's last name?"
            },
            {type: 'list',
            name: 'erole',
            message: "What is the employee's role?",
            choices: this.roles
            },
            {type: 'list',
            name: 'mgr',
            message: "Who is the employee's manager?",
            choices: this.employees
            }
        ];

        this.updateEmployeRole = [{ 
            type: 'list',
            name: 'employee',
            message: "Which employee's role do you want to update?",
            choices:this.employees
        },
        {
            type: 'list',
            name: 'role',
            message: 'Which role do you want to assign the selected employee?',
            choices: this.role
         }];

         this.managerList = [{
                        type: 'list',
                        name: 'manager',
                        message: 'Manager List:',
                        choices : this.employees
         }];      

         this.departmentList = [{
            type: 'list',
            name: 'department',
            message: 'Department List:',
            choices : this.employees
    }];

    }

    getDeleteRoleQuestions()
    {
        let questions = [{
            type: 'list',
            name: 'role',
            message: 'Which role would you like to delete?',
            choices: this.roles
        }]

        return inquirer.prompt(questions);
    }

    getAddRoleQuestions()
    {
        let questions =   [{ 
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?'
        },
        {type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
        },
        {type: 'list',
        name: 'department',
        message: 'What department does the role belong to?',
        choices: this.departments
        }
    ];

    return inquirer.prompt(questions);

    }


    async intializeApp()
    {
       let {operation} = await  inquirer.prompt(this.options);
       let choice =[];
        switch(operation)
       {
           case 'Add Employee':
             choice =  await inquirer.prompt(this.addEmployee);
             console.log(choice);             
             this.intializeApp();  
             break;
            case 'View all Employees':
              console.table(this.employees);
              this.intializeApp();
              break;
            case 'Update Employee Role':
                choice = await inquirer.prompt(this.updateEmployeRole);
                console.log(choice);
                this.intializeApp();
                break;
            case 'View Employees by Manager':
                console.log("Choose Manager to show employees");
                choice = await inquirer.prompt(this.managerList);
                console.log(choice);
                this.intializeApp();
                break;
            case 'View Employees by Department':
                console.log("Choose department to show employees");
                choice = await inquirer.prompt(this.departmentList);
                console.log(choice);
                this.intializeApp();
                break;
            case 'Delete employees':
                this.intializeApp();
                break;
            case 'View All Roles':  //done
                let rows = await getRoles();
                const tb= cTable.getTable(rows);
                console.log(tb);
                this.intializeApp();
                break;
            case 'Add Role': //done
                this.departments = await getDepartmentForChoices();
                let {title, salary, department} = await this.getAddRoleQuestions();
                let postData = { title : title,
                                salary: salary,
                                department_id : department.id};
                await createRole(postData);                
                this.intializeApp();
                break;
            case 'Delete roles':   //done
                this.roles = await getRolesForChoices();
                let {role} = await this.getDeleteRoleQuestions();
                await deleteRole(role.id);
                this.intializeApp();
                break;
            case 'View All Departments':
                this.intializeApp();
                break;
            case 'View department budget':
                this.intializeApp();
                break;
            case 'Add Department':
                this.intializeApp();
                break;
            case 'Delete departments':``
                this.intializeApp();
                break;
            default:
                console.log("Thank You For Using Employee Manager!")
                break;
       }
    }

}

