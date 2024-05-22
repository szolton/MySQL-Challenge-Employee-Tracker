-- Inserts names of departments into department table
INSERT INTO department
  (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Marketing'),
  ('Legal');

-- Inserts roles of employee into role table
INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Software Engineer', 85000, 1),
  ('Salesperson', 75000, 2),
  ('Marketing', 125000, 3),
  ('Lawyer', 200000, 4);

-- Inserts employee information into employee table
INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Sarah', 'Rachel', 1, 4),
  ('Jake', 'Michael', 2, 3),
  ('Luna', 'Elena', 3, 1),
  ('Travis', 'Pete', 4, 5);