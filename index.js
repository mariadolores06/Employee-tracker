const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

require('dotenv').config();

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
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
                "Add a Role",
                "View All Departments",
                "Add Department",
                "EXIT"
                ]
              })
}

function start() {
    inquirer 
      .prompt(startPage)
      .then((answer) => {

        if (answer.yourPick === "View All Employees") {
            viewEmployees()
        } else if (answer.yourPick === "Add Employee") {
            addEmployee()
        } else if (answer.yourPick === "Update Employee Role") {
            updateEmployeeRole()
        } else if (answer.yourPick === "View All Roles") {  
            viewRoles()
        } else if (answer.yourPick === "Add a Role") {
            addRole()
        } else if (answer.yourPick === "View All Departments") {
            viewDepartments()
        } else if (answer.yourPick === "Add Department") {
            addDepartment()
        } else {
            console.log("Thanks for using Employee Tracker! See you Later!")
            process.exit(); 
        }
    })
}     


function viewEmployees() {
  db.query("SELECT * FROM employee", function(err, result) {
    console.table(result);
    start();
  });
}

function roleChoices() {
  return db.promise().query("SELECT * from role")
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the employee you would like to add?",
        name: "fistName",
      },
      {
        type: "input",
        message: "What is the employee last name ?",
        name: "lastName",
      }, ])

    .then((answers) => {
      const firstName = answers.firstName
      const lastName = answers.lastName
      roleChoices().then(response => {
      const rolChoices = response[0].map(({ id, title}) => ({ name: title, value: id}))
    inquirer
    .prompt ([
      {
        type: "list",
        message: "What is the employees role?",
        name: "employeeRole",
        choices: rolChoices
      },
      {
        type: "list",
        message: "Do they have a manager? If so, please choose one",
        name: "employeeManager",
        choices: rolChoices
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [ firstName, lastName, answers.newRole, null], function (err, result) {
            console.log("Success! " + firstName + " " + lastName + " has been added to the employee database")
          start();
        })
      });
    });
  })
}

function employeeChoices() {
  return db.promise().query("SELECT * from employee")
}

function updateEmployeeRole() {
  employeeChoices().then(response => {
    eChoices = response[0].map(({ id, first_name, last_name}) => ({ name:`${first_name} ${last_name}`, value: id })) 
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeID",
        message: "who is the employee whos role you wish to update?",
        choices: eChoices
      }, ]) 

    .then((answers) => {
      const employee = answers.employeeID
      roleChoices().then(response => {
        const rolChoices = response[0].map(({ id, title}) => ({ name: title, value: id}))
    inquirer
      .prompt([
        {
          type: "list",
          message: "What is the employees new role?",
          name: "newRole",
          choices: rolChoices
        }, ])
      .then((answer) => {
        db.query("UPDATE employee SET role_id = ? where id = ?", [answers.newRole, employee]) 
          console.log("Success! Role has been updated.")
            start();
          })
      });
    })
  })
}

function viewRoles() {
  db.query("SELECT * FROM role", function (err, result) {
    console.table(result);
    start();
  });
}

function departmentChoices() {
  return db.promise().query("SELECT * from department")
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the title of the role you would like to add?",
        name: "roleTitle",
      },
      {
        type: "input",
        message: "What is the salary of the role you would like to add?",
        name: "roleSalary",
      }, ])

    .then((answers) => {
      const roleTitle = answers.roleName
      const roleSalary = answers.roleSalary
      departmentChoices().then(response => {
        const depChoices = response[0].map(({ id, name}) => ({ name: name, value: id}))
    inquirer
    .prompt ([
      {
        type: "list",
        message: "What is the department of the role you would like to add?",
        name: "roleDepartment",
        choices: depChoices 
      },
    ])
    .then((answer) => {
      db.query(`INSERT INTO role(title, salary, department_id) 
      VALUES (?, ?, ?)`, [roleTitle, roleSalary, answer.roleDepartment], function (err, result) {
        console.log(`Success! You added the ${roleTitle} role.`)
        start();
        })
      });
    });
  })
}

function viewDepartments() {
  db.query("SELECT * FROM department order by id", function(err, result) {
    console.table(result);
    start();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "departmentName",
      },
    ])
    .then((answer) => {
      db.query(`INSERT INTO department (id, name)
      VALUES (id,'${answer.departmentName}');`, function(err, results) {
              console.log(`Success! You added the ${answer.departmentName} department.`)
          start();
        })
    });
}


startPage();
start();


