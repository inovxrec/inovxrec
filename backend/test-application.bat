@echo off
echo Testing MeetCode Application Startup
echo ===================================

echo Starting Spring Boot application...
echo This may take 30-60 seconds...
echo.

call mvnw spring-boot:run -Dspring.profiles.active=newuser

echo.
echo If the application started successfully, test the health endpoint:
echo curl http://localhost:8081/api/health/status
echo.
echo Or open in browser: http://localhost:8081/api/health/status