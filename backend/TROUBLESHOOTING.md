# Backend Troubleshooting Guide

## Issue Fixed: UserRepository Bean Not Found

### Problem
The application was failing to start with the error:
```
Error creating bean with name 'authService': Unsatisfied dependency expressed through constructor parameter 0: No qualifying bean of type 'com.leetcodeclone.backend.repository.UserRepository' available
```

### Root Cause
The main application class had `DataSourceAutoConfiguration.class` excluded, which prevented Spring Boot from:
1. Setting up the database connection
2. Initializing JPA repositories
3. Creating repository beans

### Solution Applied
1. **Removed DataSource exclusion** from `BackendApplication.java`
2. **Added @EnableJpaRepositories** annotation for explicit repository scanning
3. **Enhanced database configuration** in `application.properties`
4. **Added health check endpoint** for testing

### Prerequisites
Before running the application, ensure:

1. **MySQL Server is running** on localhost:3306
2. **Database credentials are correct** in `application.properties`
3. **MySQL user has proper permissions** to create databases

### Testing the Fix

1. **Start the application:**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

2. **Test the health endpoint:**
   ```bash
   curl http://localhost:8081/api/health/status
   ```

3. **Expected response:**
   ```json
   {
     "database": "Connected",
     "databaseUrl": "jdbc:mysql://localhost:3306/meetcode_db",
     "userRepository": "Working",
     "userCount": 0,
     "status": "UP"
   }
   ```

### Common Issues and Solutions

#### 1. MySQL Connection Refused
**Error:** `Connection refused to host: localhost`
**Solution:** 
- Start MySQL service: `sudo systemctl start mysql` (Linux) or start MySQL from Services (Windows)
- Verify MySQL is running on port 3306

#### 2. Access Denied for User
**Error:** `Access denied for user 'root'@'localhost'`
**Solution:**
- Update password in `application.properties`
- Or reset MySQL root password

#### 3. Database Creation Failed
**Error:** `Unknown database 'meetcode_db'`
**Solution:**
- The application should auto-create the database due to `createDatabaseIfNotExist=true`
- If it fails, manually create: `CREATE DATABASE meetcode_db;`

#### 4. Port Already in Use
**Error:** `Port 8081 is already in use`
**Solution:**
- Change port in `application.properties`: `server.port=8082`
- Or kill the process using port 8081

### Verification Steps

1. **Check application logs** for any remaining errors
2. **Verify database tables are created** (users, problems, submissions)
3. **Test API endpoints:**
   - Health: `GET /api/health/status`
   - Auth: `POST /api/auth/signup`
   - Problems: `GET /api/problems`

### Configuration Files Updated

1. **BackendApplication.java** - Removed DataSource exclusion, added @EnableJpaRepositories
2. **application.properties** - Enhanced database configuration with additional parameters
3. **HealthController.java** - Added for testing database connectivity

The application should now start successfully with all repository beans properly initialized.