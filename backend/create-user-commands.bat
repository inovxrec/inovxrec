@echo off
echo Creating MySQL User for MeetCode Application
echo ==========================================

echo.
echo Step 1: Connecting to MySQL as root...
echo Please enter your MySQL root password when prompted.
echo.

mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS meetcode_db;"
if %errorlevel% neq 0 (
    echo ❌ Failed to create database. Please check your root password.
    pause
    exit /b 1
)

mysql -u root -p -e "CREATE USER IF NOT EXISTS 'meetcode'@'localhost' IDENTIFIED BY 'meetcode123';"
if %errorlevel% neq 0 (
    echo ❌ Failed to create user.
    pause
    exit /b 1
)

mysql -u root -p -e "GRANT ALL PRIVILEGES ON meetcode_db.* TO 'meetcode'@'localhost';"
if %errorlevel% neq 0 (
    echo ❌ Failed to grant privileges.
    pause
    exit /b 1
)

mysql -u root -p -e "GRANT CREATE ON *.* TO 'meetcode'@'localhost';"
mysql -u root -p -e "FLUSH PRIVILEGES;"

echo.
echo ✅ MySQL user created successfully!
echo.
echo Testing the new user connection...
mysql -u meetcode -pmeetcode123 -e "SELECT 'Connection successful!' as result;"
if %errorlevel% equ 0 (
    echo ✅ User connection test successful!
    echo.
    echo You can now run the Spring Boot application with:
    echo ./mvnw spring-boot:run -Dspring.profiles.active=newuser
) else (
    echo ❌ User connection test failed.
)

echo.
pause