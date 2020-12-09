USE employee_DB;

/* Seeding values into our Department Table */
INSERT INTO department (department_name)
VALUES ("Sales");

INSERT INTO department (department_name)
VALUES ("Engineering");

INSERT INTO department (department_name)
VALUES ("Finance");

INSERT INTO department (department_name)
VALUES ("Legal");

INSERT INTO department (department_name)
VALUES ("Marketing");

INSERT INTO department (department_name)
VALUES('C-Suite');


/* Seeding in values into our role table */
INSERT INTO role(title,salary,department_id)
VALUES('Software Engineer',90000,2);

INSERT INTO role(title,salary,department_id)
VALUES('Lead Engineer',100000,2);

INSERT INTO role(title,salary,department_id)
VALUES('Sales Lead',80000,1);

INSERT INTO role(title,salary,department_id)
VALUES('Sales Person',60000,1);

INSERT INTO role(title,salary,department_id)
VALUES('Accountant',90000,3);

INSERT INTO role(title,salary,department_id)
VALUES('Chief Financial Officer',100000,6);

INSERT INTO role(title,salary,department_id)
VALUES('Lawyer',90000,4);

INSERT INTO role(title,salary,department_id)
VALUES('Head of Legal',100000,4);

INSERT INTO role(title,salary,department_id)
VALUES('Marketing Specialist',50000,5);

INSERT INTO role(title,salary,department_id)
VALUES('CEO',200000,6);

/* Inserting Values into the Employee table */
INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('Lebron',"James",1,3);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('Kobe',"Bryant",1,3);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('Dwayne',"Wade",2,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('Tim',"Duncan",3,null);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('Magic',"Johnson",4,8);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('Michael',"Jordan",5,5);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('Kareem',"Abdul-Jabar",5,5);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('Allen',"Iverson",7,null);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('Steve',"Nash",6,5);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('Carmelo',"Anthony",8,11);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('Patrick',"Ewing",9,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('Larry',"Bird",10,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('Carl',"Malone",1,3);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('Manu',"Ginobli",8,11);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('Shaquille',"Oneal",1,3);
