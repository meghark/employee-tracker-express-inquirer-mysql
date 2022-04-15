USE employeedb;
DROP TABLE department IF EXISTS;
DROP TABLE role IF EXISTS;
DROP TABLE employee IF EXISTS;

CREATE TABLE department(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name varchar(30)
);

CREATE TABLE role(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title varchar(30),
    salary DECIMAL,
    department_id INT ,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) 
    ON DELETE SET NULL
);

CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(30),
    last_name varchar(30),
    role_id INTEGER,
    --Verify that foreign key check fires only for non-null values
    manager_id INTEGER NULL,
    CONSTRAINT fk_role  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
    CONSTRAINT fk_mgr FOREIGN KEY (manager_id) REFERENCES employee(manager_id) 
);