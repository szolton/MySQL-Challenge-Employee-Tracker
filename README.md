# SQL Challenge: Employee Tracker

The purpose of this project was to build a command-line application from scratch to manage a company's employee database, using node.js, inquirer, and MySQL. This allows non-developers to easily view and interact with information stored in databases, called content management systems.

# User Story
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

# Process
For this assignment, I relied on youtube videos such as this: https://www.youtube.com/watch?v=Cz3WcZLRaWc, tutors, and previous coursework to complete the challenge.

I began by researching, downloading all the tools (mySQL, Inquirer, node.js) and got to work. I started by creating a database on mysql and logging in/out to add lines of info, creating the schema and seeds files, and then got to the index.js where all of the questions and prompts were. There was a lot of troubleshooting with the index.js file because as soon as you'd fix one thing, another problem would pop up I would have to address.

You can see in this screenshot the different departments and all the roles.

![Data screenshot](./assets/images/data%20screenshot.png)

Here, you can see the different employees and how one would add a department successfully.

![Data screenshot](./assets/images/data%20screenshot%20-2.png)

Here, you can see what would happen after a department is added, view employees, add and change the roles they have.

![Data screenshot](./assets/images/data%20screenshot%20-3.png)

Here, you can see the bonus activity of deleting different departments, roles, and employees.

![Data screenshot](./assets/images/data%20screenshot%20-4.png)


# In conclusion
I built a command-line application using mySQL, node.js, and inquirer. You can start the application and it will:
- be presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- all the roles function with the command 'node index.js'
- the bonus activity of being able to delete roles, departments, and employees, update employee managers, view employee by manager and by department


# Links

Please see here for my video walkthrough: https://vimeo.com/949277773?share=copy 

Please see here for the link to my GitHub: https://github.com/szolton/MySQL-Challenge-Employee-Tracker