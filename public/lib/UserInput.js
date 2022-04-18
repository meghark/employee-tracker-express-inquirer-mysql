const inquirer = require('inquirer');

class UserInput
{
    constructor()
    {
        this.departments =[];
        this.employees =[];
        this.roles=[];
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

        this.adRole = [{ 
            type: 'prompt',
            name: 'rolename',
            message: 'What is the name of the role?'
        },
        {type: 'prompt',
        name: 'salary',
        message: 'What is the salary of the role?'
        },
        {type: 'list',
        name: 'department',
        message: 'What department does the role belong to?',
        choices: this.department
        }];

        this.addEmployee = [
            { 
                type: 'prompt',
                name: 'rolename',
                message: "What is the employee's first name?"
            },
            {type: 'prompt',
            name: 'salary',
            message: "What is the employee's last name?"
            },
            {type: 'list',
            name: 'department',
            message: "What is the employee's role?",
            choices: this.roles
            },
            {type: 'list',
            name: 'department',
            message: "Who is the employee's manager?",
            choices: this.employees
            }
        ];

        this.updateRole = [{ 
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
    }
}

