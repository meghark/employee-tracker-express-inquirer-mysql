import inquirer from 'inquirer';
import cTable from 'console.table';
import {getRoles, getRolesById, createRole,deleteRole, getRolesForChoices, getDepartmentBudget} from '../js/role.js';
import {getDepartment, getDepartmentById, createDepartment, deleteDepartment, getDepartmentForChoices} from '../js/department.js';
import {getEmployee, createEmployee, deleteEmployee,  
        getManagers, getEmployeesForChoices, updateEmployee, getViewEmployeesByQuery}  from  '../js/employee.js';

export class UserInput
{
    //To Do - Input validation in api methids
    //Chosing none for manager
    //Unit tests
    //Error handling
    //Update messages from api calls
    //Delete linked records


    constructor()
    {
        this.departments =[];
        this.employees =[];
        this.roles=[];
        this.managers=[];
        this.options=[{type: 'list',
                          name : 'operation',
                          message: 'What would you like to do?',
                          choices: ['View all Employees','Add Employee', 'Update Employee Role','Update Employee Managers',
                                    'View Employees by Manager', 'View Employees by Department','Delete employees',
                                    'View All Roles', 'Add Role', 'Delete roles',
                                    'View All Departments','View department budget','Add Department', 'Delete departments', 'Quit']}];

         this.departmentList = [{
            type: 'list',
            name: 'department',
            message: 'Department List:',
            choices : this.employees
    }];

    }

    getAddEmployeeQuestions()
    {
        let questions = [
            { 
                type: 'prompt',
                name: 'fname',
                message: "What is the employee's first name?"
            },
            {type: 'prompt',
            name: 'lname',
            message: "What is the employee's last name?"
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

    getUpdateEmployeeQuestions()
    {
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

    getUpdateEmployeeMgrQuestions()
    {
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
            choices: this.managers
         }];

         return inquirer.prompt(questions);
    }


    getViewEmployeesByManagerQuestion(){

        let questions = [{
            type: 'list',
            name: 'manager',
            message: 'Who would you like to see reportees for:',
            choices : this.managers
         }]; 

         return inquirer.prompt(questions);
    }

    getViewEmployeesByDepartmentQuestion(){

        let questions = [{
            type: 'list',
            name: 'depSelected',
            message: 'Which department would you like to see employees for?',
            choices : this.departments
         }]; 

         return inquirer.prompt(questions);
    }

    getDeleteEmployeeQuestions(){
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
        message: 'What is the name of the department?'}];

        return inquirer.prompt(questions);
    }

    getDeleteDepartmentQuestions()
    {
        let questions=[{type: 'list',
                    name: 'delDepartment',
                    message: 'Which department would you like to delete?',
                    choices: this.departments}];
         return inquirer.prompt(questions);
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

    getBudgetForDepartment()
    {
        let questions = [{
            type: 'list',
            name: 'budget',
            message: 'Pick a department to view budget.',
            choices: this.departments   
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
       
        switch(operation)
       {
           case 'Add Employee': //done
                this.roles = await getRolesForChoices();
                this.employees = await getEmployeesForChoices();
                this.employees.push('None');
                let {fname, lname, eRole, mgr} = await this.getAddEmployeeQuestions();
                let empPostData = { first_name : fname,
                    last_name: lname,
                    role_id : eRole.id,
                    manager_id : mgr.id};
                await createEmployee(empPostData);                
                this.intializeApp();
                break;
            case 'View all Employees': //done
                let eRows = await getEmployee();
                const etb= cTable.getTable(eRows);
                console.log(etb);
                this.intializeApp();
                break;
            case 'Update Employee Role':  //done
                this.employees =await getEmployeesForChoices();
                this.role = await getRolesForChoices();
                let {empUpdate, roleUpdate} = await this.getUpdateEmployeeQuestions();
                let empForUpdate = empUpdate.id;
                let roleForUpdate = {role_id : roleUpdate.id};
                await updateEmployee(empForUpdate, roleForUpdate);
                this.intializeApp();
                break;
            case 'Update Employee Managers':  //done
                this.employees =await getEmployeesForChoices();
                this.managers = await getManagers();
                let {empModify, mgrUpdate} = await this.getUpdateEmployeeMgrQuestions();
                let empForDeptUpdate = empModify.id;
                let mgrForUpdate = {manager_id : mgrUpdate.id};
                await updateEmployee(empForDeptUpdate, mgrForUpdate);
                this.intializeApp();
                break;
            case 'View Employees by Manager': //done
                this.managers = await getManagers();               
                let {manager} = await this.getViewEmployeesByManagerQuestion();
                let inputQuery = {
                    manager: true,
                    query : manager.id
                }
                let empOutput = await getViewEmployeesByQuery(inputQuery);
                const tableForDisplay = cTable.getTable(empOutput);
                console.log(tableForDisplay);
                this.intializeApp();
                break;
            case 'View Employees by Department': //done
                this.departments = await getDepartmentForChoices();               
                let {depSelected} = await this.getViewEmployeesByDepartmentQuestion();
                let deptQuery = {
                    department: true,
                    query : depSelected.id
                }
                let deptOut = await getViewEmployeesByQuery(deptQuery);
                const displayTable = cTable.getTable(deptOut);
                console.log(displayTable);
                this.intializeApp();
                break;
            case 'Delete employees': //done
                this.employees = await getEmployeesForChoices();
                let {emp}  = await this.getDeleteEmployeeQuestions();
                await deleteEmployee(emp.id);
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
            case 'View All Departments': //done
                let depts = await getDepartment();
                const depttb = cTable.getTable(depts);
                console.log(depttb);
                this.intializeApp();
                break;
            case 'View department budget': //done
                this.departments = await getDepartmentForChoices();
                let {budget} = await this.getBudgetForDepartment();
                let budOutput = await getDepartmentBudget(budget.id);
                console.log(`Budget for department ${budget.name} is \$${budOutput[0].Budget}`);
                this.intializeApp();
                break;
            case 'Add Department':    //done
                let dept= await this.getAddDepartmentQuestions();
                let deptPostData = {name: dept.department};
                await createDepartment(deptPostData);            
                this.intializeApp();
                break;
            case 'Delete departments': //done
                this.departments = await getDepartmentForChoices();
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

