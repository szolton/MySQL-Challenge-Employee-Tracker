// Variable Definitions & Dependencies
const inquirer = require('inquirer');
const db = require('./db/connection');

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    employee_tracker();
});

var employee_tracker = function () {
    inquirer.prompt([{
        // Begin Command Line
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: [
            'View All Department',
            'View All Roles',
            'View All Employees',
            'Add A Department',
            'Add A Role',
            'Add An Employee',
            'Update An Employee Role',
            'Update Employee Manager',
            'View Employees By Manager',
            'View Employees By Department',
            'Delete Department',
            'Delete Role',
            'Delete Employee',
            'View Department Budget',
            'Exit'
        ]
    }]).then((answers) => {
        switch (answers.prompt) {
            case 'View All Department':
                // View all departments
                db.query(`SELECT * FROM department`, (err, result) => {
                    if (err) throw err;
                    console.log("Viewing All Departments: ");
                    console.table(result);
                    employee_tracker();
                });
                break;
            case 'View All Roles':
                // View all roles
                db.query(`SELECT * FROM role`, (err, result) => {
                    if (err) throw err;
                    console.log("Viewing All Roles: ");
                    console.table(result);
                    employee_tracker();
                });
                break;
            case 'View All Employees':
                // View all employees
                db.query(`SELECT * FROM employee`, (err, result) => {
                    if (err) throw err;
                    console.log("Viewing All Employees: ");
                    console.table(result);
                    employee_tracker();
                });
                break;
            case 'Add A Department':
                // Add a department
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Enter the department name:'
                    }
                ]).then(({ name }) => {
                    db.query(`INSERT INTO department (name) VALUES (?)`, [name], (err, result) => {
                        if (err) throw err;
                        console.log(`Added department '${name}' to the database.`);
                        employee_tracker();
                    });
                });
                break;
            case 'Add A Role':
                // Add a role
                db.query(`SELECT * FROM department`, (err, departments) => {
                    if (err) throw err;
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'title',
                            message: 'Enter the role title:'
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'Enter the role salary:'
                        },
                        {
                            type: 'list',
                            name: 'departmentId',
                            message: 'Select the department for this role:',
                            choices: departments.map(department => ({ name: department.name, value: department.id }))
                        }
                    ]).then(({ title, salary, departmentId }) => {
                        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, departmentId], (err, result) => {
                            if (err) throw err;
                            console.log(`Added role '${title}' to the database.`);
                            employee_tracker();
                        });
                    });
                });
                break;
                case 'Add An Employee':
                  db.query(`SELECT * FROM role`, (err, roles) => {
                      if (err) throw err;
                      db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS manager FROM employee`, (err, managers) => {
                          if (err) throw err;
                          inquirer.prompt([
                              {
                                  type: 'input',
                                  name: 'firstName',
                                  message: 'Enter the employee\'s first name:'
                              },
                              {
                                  type: 'input',
                                  name: 'lastName',
                                  message: 'Enter the employee\'s last name:'
                              },
                              {
                                  type: 'list',
                                  name: 'roleId',
                                  message: 'Select the employee\'s role:',
                                  choices: roles.map(role => ({ name: role.title, value: role.id }))
                              },
                              {
                                  type: 'list',
                                  name: 'managerId',
                                  message: 'Select the employee\'s manager:',
                                  choices: managers.map(manager => ({ name: manager.manager, value: manager.id }))
                              }
                          ]).then(({ firstName, lastName, roleId, managerId }) => {
                              db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [firstName, lastName, roleId, managerId], (err, result) => {
                                  if (err) throw err;
                                  console.log(`Added employee '${firstName} ${lastName}' to the database.`);
                                  employee_tracker();
                              });
                          });
                      });
                  });
                  break;
              
            case 'Update An Employee Role':
                // Update an employee's role
                db.query(`SELECT * FROM employee`, (err, employees) => {
                    if (err) throw err;
                    db.query(`SELECT * FROM role`, (err, roles) => {
                        if (err) throw err;
                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'employeeId',
                                message: 'Select the employee to update:',
                                choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
                            },
                            {
                                type: 'list',
                                name: 'roleId',
                                message: 'Select the new role for the employee:',
                                choices: roles.map(role => ({ name: role.title, value: role.id }))
                            }
                        ]).then(({ employeeId, roleId }) => {
                            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleId, employeeId], (err, result) => {
                                if (err) throw err;
                                console.log(`Updated employee's role.`);
                                employee_tracker();
                            });
                        });
                    });
                });
                break;
                case 'Update Employee Manager':
                  // Update an employee's manager
                  db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS employee FROM employee`, (err, employees) => {
                      if (err) throw err;
                      db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS manager FROM employee`, (err, managers) => {
                          if (err) throw err;
                          inquirer.prompt([
                              {
                                  type: 'list',
                                  name: 'employeeId',
                                  message: 'Select the employee to update:',
                                  choices: employees.map(employee => ({ name: employee.employee, value: employee.id }))
                              },
                              {
                                  type: 'list',
                                  name: 'managerId',
                                  message: 'Select the new manager for the employee:',
                                  choices: managers.map(manager => ({ name: manager.manager, value: manager.id }))
                              }
                          ]).then(({ employeeId, managerId }) => {
                              db.query(`UPDATE employee SET manager_id = ? WHERE id = ?`, [managerId, employeeId], (err, result) => {
                                  if (err) throw err;
                                  console.log(`Updated employee's manager.`);
                                  employee_tracker();
                              });
                          });
                      });
                  });
                  break;
              
                case 'View Employees By Manager':
                  // View employees by manager
                  db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS manager FROM employee`, (err, managers) => {
                      if (err) throw err;
                      inquirer.prompt([
                          {
                              type: 'list',
                              name: 'managerId',
                              message: 'Select a manager to view employees:',
                              choices: managers.map(manager => ({ name: manager.manager, value: manager.id }))
                          }
                      ]).then(({ managerId }) => {
                          db.query(`SELECT * FROM employee WHERE manager_id = ?`, [managerId], (err, employees) => {
                              if (err) throw err;
                              console.log(`Employees managed by selected manager:`);
                              console.table(employees);
                              inquirer.prompt([
                                  {
                                      type: 'confirm',
                                      name: 'confirm',
                                      message: 'Do you want to go back to the main menu?',
                                      default: true
                                  }
                              ]).then(({ confirm }) => {
                                  if (confirm) {
                                      employee_tracker();
                                  }
                              });
                          });
                      });
                  });
                  break;
              
                case 'View Employees By Department':
                  // View employees by department
                  db.query(`SELECT * FROM department`, (err, result) => {
                      if (err) throw err;
                      inquirer.prompt([
                          {
                              type: 'list',
                              name: 'departmentId',
                              message: 'Select a department to view employees:',
                              choices: result.map(department => ({
                                  name: department.name,
                                  value: department.id
                              }))
                          }
                      ]).then(({ departmentId }) => {
                          db.query(`SELECT * FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = ?)`, [departmentId], (err, employees) => {
                              if (err) throw err;
                              console.log("Employees in the selected department:");
                              console.table(employees);
                              inquirer.prompt([
                                  {
                                      type: 'confirm',
                                      name: 'confirm',
                                      message: 'Do you want to go back to the main menu?',
                                      default: true
                                  }
                              ]).then(({ confirm }) => {
                                  if (confirm) {
                                      employee_tracker();
                                  }
                              });
                          });
                      });
                  });
                  break;
              
            case 'Delete Department':
            // Delete a department
            db.query(`SELECT * FROM department`, (err, departments) => {
                if (err) throw err;
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'departmentId',
                        message: 'Select the department to delete:',
                        choices: departments.map(department => ({ name: department.name, value: department.id }))
                    }
                ]).then(({ departmentId }) => {
                    // Check if there are roles associated with the department
                    db.query(`SELECT * FROM role WHERE department_id = ?`, [departmentId], (err, roles) => {
                        if (err) throw err;
                        if (roles.length > 0) {
                            console.log('Cannot delete department. There are roles associated with this department. Delete the roles first.');
                            employee_tracker();
                        } else {
                            // Delete the department
                            db.query(`DELETE FROM department WHERE id = ?`, [departmentId], (err, result) => {
                                if (err) throw err;
                                console.log(`Deleted department with ID ${departmentId} from the database.`);
                                employee_tracker();
                            });
                        }
                    });
                });
            });
            break;
        
              case 'Delete Role':
                  // Delete a role
                  db.query(`SELECT * FROM role`, (err, roles) => {
                      if (err) throw err;
                      inquirer.prompt([
                          {
                              type: 'list',
                              name: 'roleId',
                              message: 'Select the role to delete:',
                              choices: roles.map(role => ({ name: role.title, value: role.id }))
                          }
                      ]).then(({ roleId }) => {
                          db.query(`DELETE FROM role WHERE id = ?`, [roleId], (err, result) => {
                              if (err) throw err;
                              console.log(`Deleted role with ID ${roleId} from the database.`);
                              employee_tracker();
                          });
                      });
                  });
                  break;
              case 'Delete Employee':
                  // Delete an employee
                  db.query(`SELECT * FROM employee`, (err, employees) => {
                      if (err) throw err;
                      inquirer.prompt([
                          {
                              type: 'list',
                              name: 'employeeId',
                              message: 'Select the employee to delete:',
                              choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
                          }
                      ]).then(({ employeeId }) => {
                          db.query(`DELETE FROM employee WHERE id = ?`, [employeeId], (err, result) => {
                              if (err) throw err;
                              console.log(`Deleted employee with ID ${employeeId} from the database.`);
                              employee_tracker();
                          });
                      });
                  });
                  break;
              case 'View Department Budget':
                  // View the total utilized budget of a department
                  db.query(`SELECT department_id, SUM(salary) AS budget FROM role GROUP BY department_id`, (err, budgets) => {
                      if (err) throw err;
                      console.log("Department Budgets: ");
                      console.table(budgets);
                      employee_tracker();
                  });
                  break;
              case 'Exit':
                  console.log('Exiting application.');
                  db.end();
                  break;
          }
      });
  };
  