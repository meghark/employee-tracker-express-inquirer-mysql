import inquirer from 'inquirer';
import {getRoles,  createRole,deleteRole, getRolesForChoices, getDepartmentBudget} from '../js/role.js';
import {getDepartment,  createDepartment, deleteDepartment, getDepartmentForChoices} from '../js/department.js';
import {getEmployee, createEmployee, deleteEmployee,  
        getManagers, getEmployeesForChoices, updateEmployee, getViewEmployeesByQuery}  from  '../js/employee.js';

export  class questions
{
    constructor()
    {
        this.departments =[];
        this.employees =[];
        this.roles=[];
        this.managers=[];
        this.options=[{type: 'list',
                          name : 'operation',
                          message: 'What would you like to do?',
                          choices: ['View all Employees', 'View All Roles','View All Departments',
                                    'Add Employee', 'Update Employee Role','Update Employee Managers','Delete employees',
                                    'Add Role', 'Delete roles',
                                    'Add Department', 'Delete departments',
                                    'View Employees by Manager', 'View Employees by Department',                                     
                                    'View department used budget', 'Quit']}]; 
    }

    async getAddEmployeeQuestions()
    {
        this.roles = await getRolesForChoices();
        this.employees = await getEmployeesForChoices();      
        this.employees.push({name: 'None'});
        let questions = [
            { 
                type: 'prompt',
                name: 'fname',
                message: "What is the employee's first name?",
                validate: name => {
                    if(name)
                        {
                            return true;
                        }
                        else{
                              return "Please provide a employee first name";
                        }
                    }
            },
            {type: 'prompt',
            name: 'lname',
            message: "What is the employee's last name?",
            validate: name => {
                if(name)
                    {
                        return true;
                    }
                    else{
                          return "Please provide a employee last name";
                    }
                }
            },
            {type: 'list',
            name: 'eRole',
            message: "What is the employee's role?",
            choices: this.roles
            },
            {type: 'list',
            name: 'mgr',
            message: "Who is the employee's manager?",
            choices: this.employees
            }
        ];

        return inquirer.prompt(questions);
    }

    async getUpdateEmployeeQuestions()
    {
        this.employees =await getEmployeesForChoices();
        this.role = await getRolesForChoices();
        let questions = [{ 
            type: 'list',
            name: 'empUpdate',
            message: "Which employee's role do you want to update?",
            choices:this.employees
        },
        {
            type: 'list',
            name: 'roleUpdate',
            message: 'Which role do you want to assign the selected employee?',
            choices: this.role
         }];

         return inquirer.prompt(questions);
    }

    async getUpdateEmployeeMgrQuestions()
    {
        this.employees =await getEmployeesForChoices();
        //this.managers = await getManagers();
          let questions = [{ 
            type: 'list',
            name: 'empModify',
            message: "Which employee's manager do you want to update?",
            choices:this.employees
        },
        {
            type: 'list',
            name: 'mgrUpdate',
            message: "Who is the employee's new manager?",
            choices: this.employees
         }];

         return inquirer.prompt(questions);
    }


    async getViewEmployeesByManagerQuestion(){
        this.managers = await getManagers();   
        let questions = [{
            type: 'list',
            name: 'manager',
            message: 'Who would you like to see reportees for:',
            choices : this.managers
         }]; 

         return inquirer.prompt(questions);
    }

    async getViewEmployeesByDepartmentQuestion(){
        this.departments = await getDepartmentForChoices();   
        let questions = [{
            type: 'list',
            name: 'depSelected',
            message: 'Which department would you like to see employees for?',
            choices : this.departments
         }]; 

         return inquirer.prompt(questions);
    }

    async getDeleteEmployeeQuestions(){
        this.employees = await getEmployeesForChoices();
        let questions=[{type: 'list',
                    name: 'emp',
                    message: 'Which employee would you like to delete?',
                    choices: this.employees}];
         return inquirer.prompt(questions);
    }

    getAddDepartmentQuestions()
    {
        let questions = [{type: 'prompt',
        name : 'department',
        message: 'What is the name of the department?',
        Validate: this.comfirmMandatoryField}];

        return inquirer.prompt(questions);
    }

    async getDeleteDepartmentQuestions()
    {
        this.departments = await getDepartmentForChoices();
        let questions=[{type: 'list',
                    name: 'delDepartment',
                    message: 'Which department would you like to delete?',
                    choices: this.departments}];
         return inquirer.prompt(questions);
    }

    async getDeleteRoleQuestions()
    {
        this.roles = await getRolesForChoices();
        let questions = [{
            type: 'list',
            name: 'role',
            message: 'Which role would you like to delete?',
            choices: this.roles
        }]

        return inquirer.prompt(questions);
    }

    async getBudgetForDepartment()
    {
        this.departments = await getDepartmentForChoices();
        let questions = [{
            type: 'list',
            name: 'budget',
            message: 'Which department would you like to see the utilized budget for',
            choices: this.departments   
        }]

        return inquirer.prompt(questions);
    }

    async getAddRoleQuestions()
    {
        this.departments = await getDepartmentForChoices();
        let questions =   [{ 
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?',
            validate: name => {
                if(name)
                    {
                        return true;
                    }
                    else{
                          return "Please provide a name for the role";
                    }
                }
        },
        {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
        validate: salary => {
             if(salary && salary >=  0)
            {
                return true;
            }
            else{
                return 'Please provide a valid salary'
            }
        }
        },
        {type: 'list',
        name: 'department',
        message: 'What department does the role belong to?',
        choices: this.departments
        }
    ];

    return inquirer.prompt(questions);

    }
}

 