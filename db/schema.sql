CREATE DATABASE nodejs_employee_tracker;

USE nodejs_employee_tracker;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER
);

-- Inserts names of departments into department table
INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('Finance'), ('Legal');

-- Inserts roles of employee into role table
INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 85000, 1), 
('Salesperson', 75000, 2), 
('Accountant', 125000, 3), 
('Lawyer', 200000, 4);

-- Inserts employee information into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Juan', 'Garcia', 1, 4), 
('Jonathan', 'Villcapoma', 2, 3), 
('Jesus', 'Meraz', 3, 1), 
('Estefany', 'Munoz', 4, 5);
