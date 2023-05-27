// const mysql = require('mysql2');
// const inquirer = require('inquirer');
// const cTable = require('console.table');

// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'company_db',
//     port: '3001'
//   },
// );

// // db.connect(function (err) {
// //   if (err) throw err;
// //   (starterQuestions);
// // });

// //start page with options

// function starterQuestions() {
//     inquirer 
//       .prompt({
//         type:'list',
//         name: 'yourPick',
//         message: 'What would you like to do?',
//         choices: 
//         [
//         'View All Employees', 
//         'Add Employee', 
//         'Update Employee Role', 
//         'View All Roles', 
//         'Add a Role', 
//         'View All Departments', 
//         'Add Department', 
//         'EXIT'
//         ]
//       }).then((answer) => {
//         if (answer.yourPick === 'View all Employees') {
//           viewEmployees();
//         } else if (answer.yourPick === 'Add Employee') {
//           addEmployee();
//         } else if (answer.yourPick === 'Update Employee Role') {
//          updateEmployeeRole();
//         } else if (answer.yourPick === 'View All Roles') {
//           viewRoles();
//         } else if (answer.yourPick === 'Add a role') {
//          addRole();
//         } else if (answer.yurPick === 'All Departments') {
//           viewDepartments();
//         } else if (answer.yourPick === 'Add Department') {
//           addDepartment();
//         } else {
//           console.log('Have a nice day!')
//           process.exit()
//         }
//     }).catch((err) => {
//       if (err)throw err;
//     });
// };     


// function viewEmployees() {
//   db.query("SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name AS departments, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN role on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employee manager on manager.id = employees.manager_id;", function (err, results) {
//     console.table(results);
//     starterQuestions();
// });
// }

// // function to add a department
// function addDepartment() {
// inquirer
//     .prompt(addDepartmentQuestions)
//     .then((answer) => {
//         db.query(`INSERT INTO department (id, name)
//     VALUES (id, '${answer.departmentName}');`, function (err, results) {
//             console.log(`Success! You added the ${answer.departmentName} department.`)
//             starterQuestions();
//         })
//     })
// }

// // function to add a role
// function addRole() {
// inquirer
//     .prompt(addRoleQuestions)
//     .then((answers) => {
//         const roleTitle = answers.roleName
//         const roleSalary = answers.roleSalary
//         departmentChoices().then(response => {
//             const dChoices = response[0].map(({ id, name }) => ({ name: name, value: id }))
//             inquirer
//                 .prompt([
//                     {
//                         type: 'list',
//                         name: 'roleDepartment',
//                         message: "What is the department in for this role?",
//                         choices: dChoices
//                     },
//                 ]).then((answer) => {
//                     db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`, [roleTitle, roleSalary, answer.roleDepartment], function (err, results) {
//                         //console.log(results);
//                         console.log(`Success! You added the ${roleTitle} role.`)
//                         starterQuestions();
//                     })
//                 })
//         })

//     })
// }

// // function to add an employee
// function addEmployee() {
// inquirer
//     .prompt(addEmployeeQuestions)
//     .then((answers) => {
//         const firstName = answers.firstName
//         const lastName = answers.lastName
//         roleChoices().then(response => {
//             const rChoices = response[0].map(({ id, title }) => ({ name: title, value: id }))
//             inquirer
//                 .prompt([
//                     {
//                         type: 'list',
//                         name: 'newRole',
//                         message: "What will be their role?",
//                         choices: rChoices
//                     },
//                 ]).then((answers) => {
//                     //console.log(answers)
//                     db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, [firstName, lastName, answers.newRole, null], function (err, results) {
//                         console.log("Success! " + firstName + " " + lastName + " has been added to the employee database")
//                         starterQuestions();
//                     });
//                 })
//         })
//     })
// }

// // function to update a role
// function updateRole() {
// employeeChoices().then(response => {
//     //console.log(response[0])
//     let empChoices = response[0].map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id })) //creates an array 
//     inquirer
//         .prompt([
//             {
//                 type: 'list',
//                 name: 'employeeChosen',
//                 message: "What is the name of the employee for whom you want to update the role?",
//                 choices: empChoices

//             },

//         ])
//         .then((answers) => {
//             //console.log(answers)
//             const employee = answers.employeeChosen
//             roleChoices().then(response => {
//                 const rChoices = response[0].map(({ id, title }) => ({ name: title, value: id }))
//                 inquirer
//                     .prompt([
//                         {
//                             type: 'list',
//                             name: 'newRole',
//                             message: "What is their new role?",
//                             choices: rChoices
//                         },
//                     ]).then((answers) => {
//                         //console.log(answers)
//                         db.query("UPDATE employee SET role_id= ? WHERE id= ?", [answers.newRole, employee])
//                         console.log("Success! Role has been updated.")
//                         starterQuestions();
//                     })
//             })
//         })
// })
// }


// function roleChoices() {
//   return db.promise().query(`SELECT * from roles`)
// }

// function addEmployee() {
//   inquirer
//     .prompt([
//       {
//         type: 'input',
//         message: 'What is the first name of the employee you would like to add?',
//         name: 'firstName',
//       },
//       {
//         type: 'input',
//         message: 'What is the employee last name ?',
//         name: 'lastName',
//       }, ])

//     .then((answers) => {
//       const firstName = answers.firstName
//       const lastName = answers.lastName
//       roleChoices().then(response => {
//       const rolChoices = response[0].map(({ id, title}) => ({ name: title, value: id}))
//     inquirer
//     .prompt ([
//       {
//         type: 'list',
//         message: 'What is the employees role?',
//         name: 'employeeRole',
//         choices: rolChoices
//       },
//       {
//         type: 'list',
//         message: 'Do they have a manager? If so, please choose one',
//         name: 'employeeManager',
//         choices: rolChoices
//       },
//     ])
//     .then((answers) => {
//       db.query(
//         `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
//         [ firstName, lastName, answers.newRole, null], function (err, result) {
//             console.log("Success! " + firstName + " " + lastName + " has been added to the employee database")
//           starterQuestions();
//         })
//       });
//     });
//   })
// }

// function employeeChoices() {
//   return db.promise().query(`SELECT * from employees`)
// }

// function updateEmployeeRole() {
//   employeeChoices().then(response => {
//     let eChoices = response[0].map(({ id, first_name, last_name}) => ({ name:`${first_name} ${last_name}`, value: id })) 
//   inquirer
//     .prompt([
//       {
//         type: 'list',
//         name: 'employeeID',
//         message: 'who is the employee whos role you wish to update?',
//         choices: eChoices
//       }, ]) 

//     .then((answers) => {
//       const employee = answers.employeeID
//       roleChoices().then(response => {
//         const rolChoices = response[0].map(({ id, title}) => ({ name: title, value: id}))
//     inquirer
//       .prompt([
//         {
//           type: 'list',
//           message: 'What is the employees new role?',
//           name: 'newRole',
//           choices: rolChoices
//         }, ])
//       .then((answers) => {
//         db.query(`UPDATE employees SET role_id = ? where id = ?`, [answers.newRole, employee]) 
//           console.log('Success! Role has been updated.')
//             starterQuestions();
//           })
//       });
//     })
//   })
// }

// function viewRoles() {
//   db.query(`SELECT * FROM role`, function (err, result) {
//     console.table(results);
//     starterQuestions();
//   });
// }

// function departmentChoices() {
//   return db.promise().query(`SELECT * from departments`)
// }

// function addRole() {
//   inquirer
//     .prompt([
//       {
//         type: 'input',
//         message: 'What is the title of the role you would like to add?',
//         name: 'roleTitle',
//       },
//       {
//         type: 'input',
//         message: 'What is the salary of the role you would like to add?',
//         name: 'roleSalary',
//       }, ])

//     .then((answers) => {
//       const roleTitle = answers.roleName
//       const roleSalary = answers.roleSalary
//       departmentChoices().then(response => {
//         const depChoices = response[0].map(({ id, name}) => ({ name: name, value: id}))
//     inquirer
//     .prompt ([
//       {
//         type: 'list',
//         message: 'What is the department of the role you would like to add?',
//         name: 'roleDepartment',
//         choices: depChoices 
//       },
//     ])
//     .then((answer) => {
//       db.query(`INSERT INTO roles (title, salary, department_id) 
//       VALUES (?, ?, ?)`, [roleTitle, roleSalary, answer.roleDepartment], function (err, result) {
//         console.log(`Success! You added the ${roleTitle} role.`)
//         starterQuestions();
//         })
//       });
//     });
//   })
// }

// function viewDepartments() {
//   db.query(`SELECT * FROM departments order by id`, function(err, result) {
//     console.table(results);
//     starterQuestions();
//   });
// }

// function addDepartment() {
//   inquirer
//     .prompt([
//       {
//         type: 'input',
//         message: 'What is the name of the department you would like to add?',
//         name: 'departmentName',
//       },
//     ])
//     .then((answer) => {
//       db.query(`INSERT INTO departments (id, department_name)
//       VALUES (id,'${answer.departmentName}');`, function(err, results) {
//               console.log(`Success! You added the ${answer.departmentName} department.`)
//           init();
//         })
//     });
// }



const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password', // Need to insert password here
    database: 'company_db' // This pulls from the db created in the schema.sql
  },
    console.log('Connected to the company_db database')
);

db.connect(function (err) {
    if (err) throw err
    console.log("Connected to MySql")
    startingPrompts();
});


const startingPrompts = () => {
    return inquirer.prompt([
        {
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all Departments', 
                      'View all roles', 
                      'View all Employees', 
                      'Add a Department', 
                      'Add a Role', 
                      'Add an Employee', 
                      'Update Employee Role'],
        },
    ]).then((data) => {
        switch (data.choice) {
            case ("View all Departments"):
                viewDepts();
                break;
            case "View all roles":
                viewRoles();
                break;         
            case "View all Employees":
                viewEmployees();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployee();
                break;
        }   
    });
};

const viewDepts = () => {
    const query = "SELECT * FROM department";
    db.query(query, function (err, res) {
        if (err) throw err
        console.table(res)
        startingPrompts()
    });
};
const viewRoles = () => {
    const query = "SELECT * FROM role";
    db.query(query, function (err, res) {
        if (err) throw err
        console.table(res)
        startingPrompts();
    });
};

const viewEmployees = () => {
    const query = `SELECT 
                   employee.id, 
                   employee.first_name, 
                   employee.last_name, role.title, 
                   department.name AS department, 
                   role.salary, 
                   CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
                   FROM 
                   employee
                   LEFT JOIN role ON employee.role_id = role.id
                   LEFT JOIN department ON role.department_id = department.id
                   LEFT JOIN employee manager ON manager.id = employee.manager_id;`;

    db.query(query, function (err, res) {
        if (err) throw err
        console.table(res)
        startingPrompts();
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            name: "Name",
            type: "input",
            message: "What's the name of the department are you adding?"
        },
    ])
    .then(function(res) {
        const query = "INSERT INTO department SET ?";
        db.query(query, {
            name: res.Name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startingPrompts();
            }
        );
    });
};

const addRole = () => {

    let departmentArray = [];

    db.query("SELECT * FROM department;", (err, results) => {
        if (err) throw err;
        results.map((department) => departmentArray.push(`${department.name}`));
        return departmentArray;
    });
    
    inquirer.prompt([
        {
            name: "Title",
            type: "input",
            message: "What is the name of the Role?"
        },
        {
            name: "Salary",
            type: "input",
            message: "What is this role's Salary?"
        },
        {
            name: "Department",
            type: "list",
            message: "What department does the role belong to?",
            choices: departmentArray,
        },
    ])
    .then(function(res) {
        const departmentID = departmentArray.indexOf(res.Department) + 1;
        db.query(
            "INSERT INTO role SET ?", 
            {
                title: res.Title, 
                salary: res.Salary,
                department_id: departmentID
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startingPrompts();
            }
        )
    });
};


const addEmployee = () => {

    let managersArray = [];
    let rolesArray = [];

    const query = "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL";
    db.query(
        query, 
        (err, results) => {
            results.map(manager => 
                managersArray.push(`${manager.first_name} ${manager.last_name}`)
            );
            return managersArray;
        }
    );
    
    db.query("SELECT * FROM role ", (err, results) => {
        if (err) throw err;
        results.map(role => rolesArray.push(`${role.title}`));
        return rolesArray;
    })
    
    inquirer.prompt([
        {
            name: "First_name",
            type: "input",
            message: "What is the new employee's FIRST name?",
        },
        {
            name: "Last_name",
            type: "input",
            message: "What is the new employee's LAST name?",
        },
        {
            name: "Role",
            type: "list",
            message: "What is the employee's role?",
            choices: rolesArray,
        },
        {
            name: "Manager",
            type: "list",
            message: "Who is the Employee's manager?",
            choices: managersArray,
        }
    ]).then(function(res) {
        const roleID = rolesArray.indexOf(res.Role) + 1;
        const managerID = managersArray.indexOf(res.Manager) + 1;

        const newEmployee = {
            first_name: res.First_name,
            last_name: res.Last_name,
            manager_id: managerID,
            role_id: roleID,
        };

        db.query("INSERT INTO employee SET ?", newEmployee, err => {
            if (err) throw err;
            startingPrompts();
        })
    })
};


const updateEmployee = () => {

    let employeesArray = [];
    let rolesArray = [];
    
    db.query(
      "SELECT first_name, last_name FROM employee",
      (err, results) => {
        results.map(worker =>
            employeesArray.push(`${worker.first_name} ${worker.last_name}`)
        );
        return employeesArray;
      }
    );
    

    db.query(
      "SELECT * FROM role ", (err, results) => {
      if (err) throw err;
      results.map(role => rolesArray.push(`${role.title}`));
      return rolesArray;
    })

    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "You sure your want to update?",
        },
        {
          name: "choice",
          type: "list",
          message: "Please select the employee to update",
          choices: employeesArray,
        },
        {
            name: "role",
            type: "list",
            message: "what is the employee's new role?",
            choices: rolesArray,
        },
    ]).then(res =>{

        const roleID = rolesArray.indexOf(res.role) + 1;
        const employeeID = employeesArray.indexOf(res.choice) + 1;

        db.query (`UPDATE employee SET role_id= ${roleID} WHERE id= ${employeeID} `, (err) =>{
          if(err) throw err;
          startingPrompts();
        })
    })
};