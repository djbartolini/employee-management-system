const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

require('console.table');

const mysql = require('mysql2');
const db = mysql.createConnection({
  user: "root",
  database: "employee_db",
});


// Performs SQL query SELECT * FROM for the table being passed by chooseOption() function below
const selectAll = async (table, display) => {
  const results = await db.promise().query('SELECT * FROM ' + table);
  if (display) {
    console.table(results[0]);
    return init();
  }
  return results;
};

// Performs SQL query to insert data provided by addRole() & addEmployee() functions
const insert = (table, data) => {
  db.query('INSERT INTO ?? SET ?', [table, data], (err) => {
    if (err) return console.error(err);
    console.log('\nSuccesfully created!\n');
    init();
  });
};

// Performs SQL query to update database with the provided parameters
const update = (table, roleId, employeeId) => {
    db.query('UPDATE ?? SET ? WHERE employee.id = ?', [table, roleId, employeeId], (err) => {
        if (err) return console.error(err);
        console.log('\nSuccesfully updated!\n')
        init();
    });
}

// Select all names and ids as object from database (to be used for inquirer choices)
const selectAllNameAndValue = (table, firstName, lastName, value) => {
  return db.promise().query('SELECT CONCAT(??, " ", ??) AS name, ?? AS value FROM ??', [firstName, lastName, value, table]);
};

// Select department or roles with ids as object from database (to be used for inquirer choices)
const selectAllValue = (table, name, value) => {
  return db.promise().query('SELECT ?? AS name, ?? AS value FROM ??', [name, value, table]);
}

// Prints a table of all employees to the terminal
const selectAllEmployeeDetails = async () => {
  const statement = `
    SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    role.salary,
    CONCAT(
        manager.first_name,
        ' ',
        manager.last_name
    ) AS manager
    FROM employee
    JOIN role
    ON employee.role_id = role.id
    JOIN employee AS manager
    ON employee.manager_id = manager.id
    `
    const [employees] = await db.promise().query(statement);
    console.table(employees);
    init();
};

// send answers to insert() function to add a role to the database
const addRole = async () => {
    const [departments] = await selectAllValue('department', 'name', 'id');
    prompt([
        {
            name: 'title',
            message: 'What is the name of the role?'
        },
        {
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'rawlist',
            name: 'department_id',
            message: 'What department does this role belong to?',
            choices: departments
        }
    ])
    .then((answers) => {
        insert('role', answers);
    })
}

// Send answers to insert() function to add an employee to database
const addEmployee = async () => {
  const [roles] = await selectAllValue('role', 'title', 'id');
  const [managers] = await selectAllNameAndValue('employee', 'first_name', 'last_name', 'id');
  prompt([
    {
      name: 'first_name',
      message: 'Enter the employee\'s first name.',
    },
    {
      name: 'last_name',
      message: 'Enter the employee\'s last name.',
    },
    {
      type: 'rawlist',
      name: 'role_id',
      message: 'Choose a role for this employee.',
      choices: roles,
    },
    {
      type: 'rawlist',
      name: 'manager_id',
      message: 'Choose a manager for this employee.',
      choices: managers,
    }
  ])
  .then((answers) => {
    insert('employee', answers);
  });
};

// Send answers to update() function to update role
const updateRole = async () => {
    const [roles] = await selectAllValue('role', 'title', 'id');
    const [employees] = await selectAllNameAndValue('employee', 'first_name', 'last_name', 'id');
    prompt([
        {
            type: 'rawlist',
            name: 'id',
            message: 'Which employee\'s role are you updating?',
            choices: employees
        },
        {
            type: 'rawlist',
            name: 'role_id',
            message: 'What is this employee\'s new role?',
            choices: roles
        }
    ])
    .then((answers) => {
        const roleId = {role_id: answers.role_id};
        update('employee', roleId, answers.id);
    })
}

// Send answers to update() function to update manager
const updateManager = async () => {
    const [managers] = await selectAllNameAndValue('employee', 'first_name', 'last_name', 'id');
    const [employees] = await selectAllNameAndValue('employee', 'first_name', 'last_name', 'id');
    prompt([
        {
            type: 'rawlist',
            name: 'id',
            message: 'Which employee\'s role are you updating?',
            choices: employees
        },
        {
            type: 'rawlist',
            name: 'manager_id',
            message: 'Who is this employee\'s new manager?',
            choices: managers
        }
    ])
    .then((answers) => {
        const managerId = {manager_id: answers.manager_id};
        update('employee', managerId, answers.id);
    })
}

// Switch case for the possible cases provided below
const chooseOption = (type) => {
  switch (type) {
    case 'View All Employees': {
      selectAllEmployeeDetails();
      break;
    }
    case 'View All Departments': {
      selectAll('department', true);
      break;
    }
    case 'View All Roles': {
      selectAll('role', true);
      break;
    }
    case 'Add Employee': {
      addEmployee();
      break;
    }
    case 'Add Role': {
      addRole();
      break;
    }
    case 'Update Employee Role': {
      updateRole();
      break;
    }
    case 'Update Employee Manager': {
      updateManager();
      break;
    }
    case 'Done': {
      process.exit();
    }
  }
};

// Initial prompt that can be repeated indefinitely or exited via 'Done'
const init = () => {
  prompt({
    type: 'rawlist',
    message: 'Choose one of the following:',
    choices: [
      'View All Employees',
      'View All Departments',
      'View All Roles',
      'Add Employee',
      'Add Role',
      'Update Employee Role',
      'Update Employee Manager',
      'Done'
    ],
    name: 'type',
  })
    .then((answers) => {
      chooseOption(answers.type);
    });
};

init();