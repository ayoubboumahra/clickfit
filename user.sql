CREATE DATABASE IF NOT EXISTS clickfit;
USE clickfit;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    ID INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    password VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    type VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    active TINYINT DEFAULT 1,
    PRIMARY KEY (ID),
    UNIQUE (email)
);

-- Create stored procedure to insert new user
DELIMITER $$
CREATE PROCEDURE addUser(
    IN u_email VARCHAR(255),
    IN u_password VARCHAR(255),
    IN u_type VARCHAR(255),
    IN u_active TINYINT
)
BEGIN
    INSERT INTO users (email, password, type, active) 
    VALUES (u_email, u_password, u_type, u_active);
END $$
DELIMITER ;

-- Call stored procedure to insert a new user
CALL addUser('user@example.com', 'securepassword', 'admin', 1);