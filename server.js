const inquirer = require('inquirer');
const mysql = require('mysql2');



const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'LeeandCarter2023!',
    database: 'work_db'
  }
)

db.connect((err) => {
  if (err) throw new err;
  console.log("Connected to the database")
})


const prompt = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'option',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
  },
  {
    type: 'input',
    message: 'What department would you like to add?',
    name: 'addDepartment',
    default: 'Customer Service'
  },
  {
    type: 'input',
    message: 'Update Employees',
    name: 'insertEmployee',
    default: 'Add Employee, include first and last name'
  }, 
  {
    type: 'input',
    message: 'What is the name of the role?',
    name: 'addRole',
    default: 'Add Role'
  },
  {
    type: 'input',
    message: 'Update an employee role',
    name: 'updateRole',
    default: 'Jon Doe Software Engineer'
  }
]

const viewAllDepartments = () =>  {
  db.query('SELECT * FROM `department`', function (err, results) {
    if (err) throw err;
    console.log(results, "results")
    return results
  });
}

const handleUpdateDepartment = (answers) =>  {
  const { addDepartment } = answers;
  db.query('INSERT INTO `department` (departmentName) VALUES (?)', [addDepartment], function (err, results) {
    if (err) throw err;
  });
}

const viewAllEmployees = () =>  {
  db.query('SELECT * FROM `employee`', function (err, results) {
    if (err) throw err;
    console.log(results)
  });
}

const handleUpdateEmployee = (answers) =>  {
  const { insertEmployee } = answers;
  db.query('INSERT INTO `employee` (first_name, last_name) VALUES (?, ?)' , [insertEmployee], function (err, results) {
    if (err) throw err;
    console.log(results)
  });
}

const handleUpdateRole = (answers) =>  {
  const { updateRole } = answers;
  db.query('INSERT INTO `role` (title) VALUES (?)', [updateRole], function (err, results) {
    if (err) throw err;
    console.log(results)
  });
}

const init = () => {
  inquirer.prompt(prompt)
    .then(answers => {
      console.log(answers, "answers")
      switch(answers.option) {
        case  "view all departments":
          console.log("view all departments")
          viewAllDepartments();
          break;
        case "add a department":
          handleUpdateDepartment();
          break;
        case "view all employees":
          viewAllEmployees();
          break;
        case "add an employee":
          handleUpdateEmployee();
          break;
        case  "update an employee role":
          handleUpdateRole();
          break;
      }
    })
    .catch(error => {
      console.log("Error", error)
    })
}

init();