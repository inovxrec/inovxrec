@echo off
echo Starting MeetCode Backend with Development Profile (No Password)
echo =============================================================

REM Set environment variables for development profile (no password)
set SPRING_PROFILES_ACTIVE=dev
set SPRING_DATASOURCE_USERNAME=root
set SPRING_DATASOURCE_PASSWORD=
set SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/meetcode_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC

echo Using MySQL user: root (no password)
echo Database: meetcode_db
echo.

echo Testing MySQL connection first...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -e "SELECT 'Root connection test' as result;"

if %errorlevel% neq 0 (
    echo ERROR: Cannot connect to MySQL with root user and no password
    echo Please check your MySQL configuration
    pause
    exit /b 1
)

echo MySQL connection successful!
echo Starting application...
call mvnw spring-boot:run

pause