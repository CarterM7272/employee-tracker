const inquirer = require('inquirer');
const mysql = require('mysql2');

const questions = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'list',
    choices: ['View All Employees', 'Add Employee', 'View All Departments', 'Add A Department', 'Add A Role', 'Update An Employee Role']
  },
  {
    type: 'input',
    message: 'What is the name of the department?',
    name: 'addDepartment',
    default: 'Customer Support'
  }, 
  {
    type: 'input',
    message: 'What would you like to do?',
    name: 'addRole',
    default: 'Add Role'
  },
  {
    type: 'input',
    message: 'What is the name of the role',
    name: 'nameRole',
    default: 'Customer Representative'
  },
  
]