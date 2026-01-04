-- Create MySQL User for MeetCode Application
-- Run this script as MySQL root user

-- Create the database
CREATE DATABASE IF NOT EXISTS meetcode_db;

-- Create a new user specifically for the application
CREATE USER IF NOT EXISTS 'meetcode'@'localhost' IDENTIFIED BY 'meetcode@123';

-- Grant all privileges on the meetcode_db database
GRANT ALL PRIVILEGES ON meetcode_db.* TO 'meetcode'@'localhost';

-- Grant privileges to create databases (for testing)
GRANT CREATE ON *.* TO 'meetcode'@'localhost';

-- Apply the changes
FLUSH PRIVILEGES;

-- Verify the user was created
SELECT User, Host FROM mysql.user WHERE User = 'meetcode';

-- Show granted privileges
SHOW GRANTS FOR 'meetcode'@'localhost';