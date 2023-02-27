const mysql = require('mysql2');
const sequelize = require('./config/connection');


//Presented with options: View all departments, view all roles, view all employees, add a department, add a role, add an employee. and update an employee role
//Department: Formated Table showing department names and department IDs
//Roles: Job Title, Role ID, Department that role belongs to
//Employees: Formated Table showing employee data, inlcuding employee IDs, first name, last name, job title, departments, salaries, and managers
//Add Department: prompted to enter name of department 
//Add a role: enter the name, salary, and department that for the role
//Add Employee: employee first name, last name, role, and manager
//Update Employee: select an employee to update and their new role