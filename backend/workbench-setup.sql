-- Run this script in MySQL Workbench to set up the MeetCode application user
-- Copy and paste this entire script into a new SQL tab and execute it

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS meetcode_db;

-- Step 2: Create the application user
CREATE USER IF NOT EXISTS 'meetcode'@'localhost' IDENTIFIED BY 'meetcode123';

-- Step 3: Grant all privileges on the meetcode_db database
GRANT ALL PRIVILEGES ON meetcode_db.* TO 'meetcode'@'localhost';

-- Step 4: Grant database creation privileges (for testing)
GRANT CREATE ON *.* TO 'meetcode'@'localhost';

-- Step 5: Apply the changes
FLUSH PRIVILEGES;

-- Step 6: Verify the setup
SELECT 'User created successfully!' as status;
SELECT User, Host FROM mysql.user WHERE User = 'meetcode';
SHOW GRANTS FOR 'meetcode'@'localhost';