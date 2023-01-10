USE employee_db;
INSERT INTO department (name)
    VALUES
    ('Engineering'),
    ('Finance'),
    ('Marketing'),
    ('Sales');
INSERT INTO role (title, salary, department_id)
    VALUES
    ('Engineering Manager', 150000, 1),
    ('Senior Engineer', 100000, 1),
    ('Junior Engineer', 75000, 1),
    ('CFO', 150000, 2),
    ('Senior Accountant', 100000, 2),
    ('Accountant', 75000, 2),
    ('Marketing Manager', 150000, 3),
    ('Marketing Analyst', 100000, 3),
    ('Marketing Agent', 75000, 3),
    ('Sales Manager', 100000, 4),
    ('Salesperson', 75000, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
    ('Mickie', 'Mouse', 1, 1),
    ('Minnie', 'Mouse', 2, 1),
    ('Pluto', '', 3, 1),
    ('Goofy', '', 4, 4),
    ('Donald', 'Duck', 5, 4),
    ('Daisy', 'Duck', 6, 4),
    ('Huey', 'Duck', 7, 7),
    ('Dewey', 'Duck', 8, 7),
    ('Louie', 'Duck', 9, 7),
    ('Timon', '', 10, 10),
    ('Pumbaa', '', 11, 10);