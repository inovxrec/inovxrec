@echo off
echo Testing MySQL Connection for MeetCode Backend
echo =============================================

REM Test 1: No password
echo Test 1: Connecting with no password...
mysql -u root -e "SELECT 'Connection successful - no password' as result;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ SUCCESS: Use empty password in application.properties
    echo spring.datasource.password=
    exit /b 0
)

REM Test 2: Password 'root'
echo Test 2: Connecting with password 'root'...
mysql -u root -proot -e "SELECT 'Connection successful - password: root' as result;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ SUCCESS: Use 'root' password in application.properties
    echo spring.datasource.password=root
    exit /b 0
)

REM Test 3: Password 'password'
echo Test 3: Connecting with password 'password'...
mysql -u root -ppassword -e "SELECT 'Connection successful - password: password' as result;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ SUCCESS: Use 'password' password in application.properties
    echo spring.datasource.password=password
    exit /b 0
)

REM Test 4: Check if MySQL service is running
echo Test 4: Checking if MySQL service is running...
sc query mysql 2>nul | find "RUNNING" >nul
if %errorlevel% equ 0 (
    echo ✅ MySQL service is running
) else (
    echo ❌ MySQL service is not running. Start it from Services or run: net start mysql
    exit /b 1
)

REM Test 5: Check if port 3306 is open
echo Test 5: Checking if MySQL is listening on port 3306...
netstat -an | find ":3306" | find "LISTENING" >nul
if %errorlevel% equ 0 (
    echo ✅ MySQL is listening on port 3306
) else (
    echo ❌ MySQL is not listening on port 3306
    exit /b 1
)

echo.
echo ❌ All connection tests failed. Please:
echo 1. Verify MySQL is installed and running
echo 2. Check your MySQL root password
echo 3. Try connecting manually: mysql -u root -p
echo 4. See MYSQL_SETUP.md for detailed instructions