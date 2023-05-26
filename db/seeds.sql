INSERT INTO departments (department_name)
VALUES ("Finance"),
       ("Marketing"),
       ("IT"),
       ("Engineering");


INSERT INTO roles (title, salary, department_id)
VALUES ("Market Analyst", 63000, 2),
       ("IT Support Specialist", 49000, 3),
       ("Marketing Manager", 94000 2),
       ("Portfolio Manager", 115000, 1),
       ("Senior Analyast", 88000, 1)
       ("Software Engineer", 105000, 4),
       ("Engineering Manager", 105000, 4),
       ("IT Manager", 107000, 3);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("James", "Robert", 5, 4),
       ("Jennifer", "Smith", 3, NULL),
       ("Mark", "Andrews", 6, 7),
       ("Emily", "Williams", 1, 3),
       ("Frank", "Reynolds", 7, NULL),
       ("Charlie", "Day", 2, 8);
