const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql2');
require('console.table');

const db = mysql.createConnection({
    user: 'root',
    database: 'employee_db'
});

const promptDepartmentInfo = () => {
    prompt([
        {
            type: 'input',
            message: 'What is the department\'s name?',
            validate: function(input) {
                if (input.length > 0 && input.length < 31) 
                    return true;
            },
            name: 'departmentName'
        }
    ])
    .then((answers) => {
        db.query(`INSERT INTO department (name)
            VALUES ('${answers.departmentName}')`, (err, departments) => {
                console.table(departments);
                init();
            })
    })
}

const promptRoleInfo = () => {
    db.query('SELECT * FROM department;', (err, departments) => {
        let departmentsArr = [];
        for (let department of departments) {
            departmentsArr.push(department.name);
        }
        prompt([
            {
                type: 'input',
                message: 'What is the role\'s title?',
                validate: function(input) {
                    if (input.length > 0 && input.length < 31) 
                        return true;
                },
                name: 'roleTitle'
            },
            {
                type: 'input',
                message: 'What is this role\'s salary?',
                // validate: function(input) {
                //     if (input.typeOf === 'number') 
                //         return true;
                // },
                name: 'roleSalary'
            },
            {
                type: 'list',
                message: 'What department does this role belong to?',
                choices: departmentsArr,
                name: 'roleDepartment'
            }
        ])
        .then((answers) => {
            db.query(`INSERT INTO role (title, salary, department_id)
            VALUES ('${answers.roleTitle}',
                ${answers.roleSalary},
                ${departmentsArr.indexOf(answers.roleDepartment) + 1}
                );`, (err, roles) => {
                    console.table(roles);
                    init();
                });
        })
    })
}

const promptEmployeeInfo = () => {
    db.query(`SELECT * FROM role;`, (err, roles) => {
        let rolesArr = [];
        for (let role of roles) {
            rolesArr.push(role.name);
        }
        db.query('SELECT * FROM employee', (err, employees) => {
            let managersArr = [];
            for (let employee of employees) {
                if (employees.manager_id === null) {
                    managersArr.push(employee.first_name + ' ' + employee.last_name);
                }
            }
            prompt([
                {
                    type: 'input',
                    message: 'What is the employee\'s FIRST name?',
                    validate: function(input) {
                        if (input.length > 0 && input.length < 31) 
                            return true;
                    },
                    name: 'employeeFirstName'
                },
                {
                    type: 'input',
                    message: 'What is the employee\'s LAST name?',
                    validate: function(input) {
                        if (input.length > 0 && input.length < 31) 
                            return true;
                    },
                    name: 'employeeLastName'
                },
                {
                    type: 'input',
                    message: 'What is this employee\'s role?',
                    // validate: function(input) {
                    //     if (input.typeOf === 'number') 
                    //         return true;
                    // },
                    name: 'employeeRole'
                },
                {
                    type: 'list',
                    message: 'What department employee does this role belong to?',
                    choices: rolesArr,
                    name: 'employeeRole'
                },
                {
                    type: 'list',
                    message: 'Who is the manager for this employee?',
                    choices: managersArr,
                    name: 'employeeManager'
                }
            ])
            .then((answers) => {
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES ('${answers.employeeFirstName}',
                    ${answers.employeeLastName},
                    ${rolesArr.indexOf(answers.employeeRole) + 1},
                    ${managersId.indexOf()}
                    );`, (err, roles) => {
                        console.table(roles);
                        init();
                    });
        })
        })
    })
}

const chooseOption = (type) => {
    switch(type) {
        case 'VIEW ALL EMPLOYEES': {
            db.query('SELECT * FROM employee', (err, employees) => {
                console.table(employees);
                init();
            });
            break;
        }
        case 'VIEW ALL DEPARTMENTS': {
            db.query('SELECT * FROM department', (err, departments) => {
                console.table(departments);
                init();
            });
            break;
        }
        case 'VIEW ALL ROLES': {
            db.query('SELECT * FROM role', (err, roles) => {
                console.table(roles);
                init();
            });
            break;
        }
        case 'ADD A DEPARTMENT': {
            promptDepartmentInfo();
            break;
        }
        case 'ADD A ROLE': {
            promptRoleInfo();
            break;
        }
    }
}

const init = () => {
    prompt({
        type: 'rawlist',
        message: 'Choose one:',
        choices: [
            'VIEW ALL EMPLOYEES',
            'VIEW ALL DEPARTMENTS',
            'VIEW ALL ROLES',
            'ADD A DEPARTMENT',
            'ADD A ROLE'
        ],
        name: 'type'
    })
    .then((answers) => {
        chooseOption(answers.type);
    })
};

// getDepartments();
init();