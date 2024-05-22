-- Inserts names of departments into department table
INSERT INTO department
  (name)
VALUES
  ('HR'),
  ('Marketing'),
  ('Creative'),
  ('Sales'),
  ('Engineering'),
  ('Accounting'),
  ('Security'),
  ('Customer Service');

-- Inserts roles of employee into role table
INSERT INTO role
  (title, salary, department_id)
VALUES
  ('HR', 50000, 1),
  ('Office Admin', 40000, 1),
  ('Marketing Specialist', 45000, 2),
  ('Graphic Designer', 200000, 3),
  ('Lead Salesperson', 80000, 4),
  ('Software Enginner', 90000, 5),
  ('Accountant', 600000, 6),
  ('Head of Security', 70000, 7)
  ('Customer Service Representative', 45000, 8);

-- Inserts employee information into employee table
INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Sarah', 'Rachel', 1, 4),
  ('Jake', 'Michael', 2, 3),
  ('Luna', 'Elena', 4, 1),
  ('Travis', 'Pete', 5, 5);