USE employeedb;

INSERT INTO department (name) 
    VALUES ('Sales'),
          ('Engineering'), 
          ('Finance'), 
          ('Legal'), 
          ('HR');

INSERT INTO role 
    (title, salary, department_id)
    VALUES
    ('Sales Person', '65000', 1),
    ('Manager', '85000', 1),
    ('Lead Engineer', '78000', 2),
    ('Software Engineer', '68000',2),
    ('Software Manager', '90000', 2),
    ('Account Manager', '92000', 3),
    ('Accountant', '70000', 3),
    ('Legal Team Lead', '88000', 3),
    ('Lawyer', '79000', 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
    VALUES
    ('Jerry', 'Magnum', 2, NUll),
    ('Ashley', 'John', 1, 1),
    ('Tim', 'Look', 1,1),
    ('Tracy', 'Adams',5 , NULL),
    ('Nish', 'Keets', 4,4),
    ('Tom', 'Jack', 3, 4),
    ('Ronny', 'Hanes',6,NULL),
    ('Jean', 'Henry',7, 7),
    ('Nina', 'Merck', 8, NUll),
    ('Donna', 'Cook', 9, 9);
