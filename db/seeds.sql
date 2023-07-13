USE work_db;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
      (1, "John", "Doe", 1, 0),
      (2, "Carter", "Pierr", 2, 0),
      (3, "Caleb", "Belac", 3, 0),
      (4, "Connor", "Ronnoc", 4, 0);

INSERT INTO role (id, title, salary, department_id)
VALUES 
      (1, "Janitor", 0.0, 0),
      (2, "Teacher", 0.0, 0),
      (3, "Manager", 0.0, 0),
      (4, "Homeless", 0.0, 0);