const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'LeeandCarter2023!',
  database: 'work_db'
});

const connectToDatabase = async () => {
  try {
    await db.connect();
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the process with an error code
  }
};

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

const viewAllDepartments = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM department', function (err, results) {
      if (err) reject(err);
      console.log(results);
      resolve(results);
    });
  });
};



const handleUpdateDepartment = (answers) => {
  const { addDepartment } = answers;
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO department (departmentName) VALUES (?)', [addDepartment], function (err, results) {
      if (err) reject(err);
      resolve(results);
    });
  });
};



const viewAllEmployees = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM employee', function (err, results) {
      if (err) reject(err);
      console.log(results);
      resolve(results);
    });
    prompt
  });
};

const handleUpdateEmployee = (answers) => {
  const { insertEmployee } = answers;
  const [first_name, last_name] = insertEmployee.split(" ");
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO employee (first_name, last_name) VALUES (?, ?)', [first_name, last_name], function (err, results) {
      if (err) reject(err);
      console.log(results);
      resolve(results);
    });
  });
};

const handleUpdateRole = (answers) => {
  const { updateRole } = answers;
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO role (title) VALUES (?)', [updateRole], function (err, results) {
      if (err) reject(err);
      console.log(results);
      resolve(results);
    });
  });
};

const init = async () => {

  console.log("*******************")
  console.log("*                  *")
  console.log("* Employee Tracker *")
  console.log("*                  *")
  console.log("*******************")



  try {
    await connectToDatabase();
    const answers = await inquirer.prompt(prompt);
    console.log(answers, "answers");
    let result;
    switch (answers.option) {
      case "view all departments":
        console.log("view all departments");
        result = await viewAllDepartments();
        break;
      case "add a department":
        result = await handleUpdateDepartment(answers);
        break;
      case "view all employees":
        console.log("view all employees");
        result = await viewAllEmployees();
        break;
      case "add an employee":
        result = await handleUpdateEmployee(answers);
        break;
      case "update an employee role":
        result = await handleUpdateRole(answers);
        break;
      default:
        console.log("Invalid option");
        db.end();
        return; // Exit the function and stop inquirer
    }
    console.log("Result:", result);
    db.end(); // Close the database connection after all operations are done
  } catch (error) {
    console.log("Error", error);
    db.end(); // Close the database connection in case of an error
  }
};

init();