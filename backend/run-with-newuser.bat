@echo off
echo Starting MeetCode Backend with New User Profile
echo =============================================

REM Set environment variables for the new user profile
set SPRING_PROFILES_ACTIVE=newuser
set SPRING_DATASOURCE_USERNAME=meetcode
set SPRING_DATASOURCE_PASSWORD=meetcode123
set SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/meetcode_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC

echo Using MySQL user: meetcode
echo Database: meetcode_db
echo.

echo Starting application...
call mvnw spring-boot:run

pause