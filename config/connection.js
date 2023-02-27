// From ORM lesson 2 Sequelize set up 
const Sequelize = require('sequelize');
require('dotenv').config();

console.log(process.env) 
//connect to database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);
  

module.exports = sequelize;
