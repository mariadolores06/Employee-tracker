const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
// const sequelize = require('./config/connection');

// sequelize.ConnectionError(err => {
//   if (err) throw err;
//   console.log('connected' + sequelize.threadId);
//   afterConnection();
// });

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'books_db'
  },
  console.log(`Connected to the _db database.`)
);

//start page with options
function startPage() {
    inquirer   
        .prompt({  
            type:"list",
            name: "yourPick",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "View All Departments",
                "Add Department",
                "Update Employee Managers", //Extra
                "View Employees By Manager", //Extra
                "View Employees By Department", //Extra
                "Delete Departments", //Extra
                "Delete Roles", //Extra
                "Delete Employees", //Extra
                "EXIT"
                ]
            })
        .then(function(answer) {
            switch (answer.yourPick) {
                case "View All Employees":
                  viewEmployees();
                  break;

                case "Add Employee":
                  AddEmployee();
                  break;
                
                case "Update Employee Role":
                  UpdateEmployeeRole();
                  break;

                case "View All Roles":
                  viewRoles();
                  break;

                case "View All Departments":
                  viewDepartments();
                  break;

                case "Add Department":
                  addDepartment();
                  break;

                case "Update Employee Managers":
                  updateEmployeeManagers();
                  break;

                case "View Employees By Manager":
                  viewEmployeesByManagers();
                  break;

                case "View Employees By Department":
                  viewEmployeesByDept();
                  break;

                case "Delete Departments":
                  deleteDepartments();
                  break;

                case "Delete Roles":
                  deleteRoles();
                  break;

                case "Delete Employees":
                  deleteEmployees();
                  break;

                case "EXIT":
                  console.log("Thanks for using Employee Tracker! See you Later!")
                  EXIT();
                  
            }
          });
    
};

startPage();

viewEmployees() {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name,  `
}

viewRoles() {
  
}

viewDepartments() {
  
}


//Presented with options: View all departments, view all roles, view all employees, add a department, add a role, add an employee. and update an employee role
//Department: Formated Table showing department names and department IDs
//Roles: Job Title, Role ID, Department that role belongs to
//Employees: Formated Table showing employee data, inlcuding employee IDs, first name, last name, job title, departments, salaries, and managers
//Add Department: prompted to enter name of department 
//Add a role: enter the name, salary, and department that for the role
//Add Employee: employee first name, last name, role, and manager
//Update Employee: select an employee to update and their new role