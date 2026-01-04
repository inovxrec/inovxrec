@echo off
echo MeetCode Backend Startup
echo ========================

echo Testing MySQL connection...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u meetcode -pmeetcode123 -e "SELECT 'Connection OK' as status;"

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Cannot connect to MySQL with meetcode user
    echo.
    echo Please create the MySQL user first:
    echo 1. Open MySQL Workbench
    echo 2. Run this SQL:
    echo    CREATE DATABASE IF NOT EXISTS meetcode_db;
    echo    CREATE USER IF NOT EXISTS 'meetcode'@'localhost' IDENTIFIED BY 'meetcode123';
    echo    GRANT ALL PRIVILEGES ON meetcode_db.* TO 'meetcode'@'localhost';
    echo    FLUSH PRIVILEGES;
    echo.
    pause
    exit /b 1
)

echo MySQL connection successful!
echo.
echo Starting Spring Boot application...
echo This may take 30-60 seconds...
echo.

mvnw spring-boot:run -Dspring.profiles.active=newuser

echo.
echo Application startup complete!
echo Test the health endpoint: http://localhost:8081/api/health/status
pause