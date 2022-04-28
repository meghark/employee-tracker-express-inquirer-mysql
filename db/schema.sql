USE employeedb;
DROP TABLE IF EXISTS employee ;
DROP TABLE IF EXISTS role ;
DROP TABLE IF EXISTS department ;



CREATE TABLE department(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name varchar(30) NOT NULL
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
    manager_id INTEGER ,
    CONSTRAINT fk_role  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    CONSTRAINT fk_mgr FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);