USE choresmanagement;

-- Create the 'users' table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL
);

-- Create the 'chores' table
CREATE TABLE chores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chore_description VARCHAR(255) NOT NULL,
  duration INT NOT NULL
);

-- Create the 'assignments' table
CREATE TABLE assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  chore_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (chore_id) REFERENCES chores(id)
);

-- Insert dummy data into 'users' table
INSERT INTO users (first_name, last_name) VALUES
('John', 'Doe'),
('Jane', 'Doe'),
('Alice', 'Smith'),
('Bob', 'Johnson');

-- Insert dummy data into 'chores' table
INSERT INTO chores (chore_description, duration) VALUES
('Clean the kitchen', 30),
('Take out the trash', 15),
('Vacuum the living room', 45),
('Mow the lawn', 60);

-- Insert dummy data into 'assignments' table
INSERT INTO assignments (user_id, chore_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

