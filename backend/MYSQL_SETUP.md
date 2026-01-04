# MySQL Setup Guide for MeetCode Backend

## Current Issue
```
Access denied for user 'root'@'localhost' (using password: NO)
```

This means your MySQL root user requires a password, but the application is trying to connect without one.

## Quick Solutions

### Option 1: Find Your Current MySQL Password
Try these common passwords in `application.properties`:
- `spring.datasource.password=root`
- `spring.datasource.password=password` 
- `spring.datasource.password=admin`
- `spring.datasource.password=` (empty - already tried)

### Option 2: Reset MySQL Root Password

#### For Windows (using MySQL Workbench or Command Line):
1. **Stop MySQL Service:**
   - Open Services (services.msc)
   - Find "MySQL80" or similar, right-click → Stop

2. **Start MySQL in Safe Mode:**
   ```cmd
   mysqld --skip-grant-tables --skip-networking
   ```

3. **Connect and Reset Password:**
   ```sql
   mysql -u root
   USE mysql;
   UPDATE user SET authentication_string=PASSWORD('root') WHERE User='root';
   FLUSH PRIVILEGES;
   EXIT;
   ```

4. **Restart MySQL Service normally**

#### For Linux/Mac:
```bash
# Stop MySQL
sudo systemctl stop mysql

# Start in safe mode
sudo mysqld_safe --skip-grant-tables --skip-networking &

# Connect and reset
mysql -u root
USE mysql;
UPDATE user SET authentication_string=PASSWORD('root') WHERE User='root';
FLUSH PRIVILEGES;
EXIT;

# Restart MySQL
sudo systemctl start mysql
```

### Option 3: Create New Database User
```sql
# Connect as root (if you know the password)
mysql -u root -p

# Create new user for the application
CREATE USER 'meetcode'@'localhost' IDENTIFIED BY 'meetcode123';
GRANT ALL PRIVILEGES ON meetcode_db.* TO 'meetcode'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Then update `application.properties`:
```properties
spring.datasource.username=meetcode
spring.datasource.password=meetcode123
```

### Option 4: Use Different Profiles

#### Run with no password profile:
```bash
./mvnw spring-boot:run -Dspring.profiles.active=dev
```

#### Run with password profile:
```bash
./mvnw spring-boot:run -Dspring.profiles.active=local
```

## Testing Your MySQL Connection

### 1. Test MySQL Connection Directly:
```bash
# Test with no password
mysql -u root

# Test with password
mysql -u root -p
```

### 2. Check MySQL Status:
```bash
# Windows
net start mysql

# Linux/Mac
sudo systemctl status mysql
```

### 3. Verify MySQL is Running on Port 3306:
```bash
netstat -an | grep 3306
```

## Common MySQL Installation Scenarios

### XAMPP Users:
- Default username: `root`
- Default password: `` (empty)
- Use the `dev` profile

### WAMP Users:
- Default username: `root`
- Default password: `` (empty)
- Use the `dev` profile

### Standalone MySQL Installation:
- Username: `root`
- Password: Set during installation
- Update `application.properties` with your password

### Docker MySQL:
```bash
# Run MySQL in Docker
docker run --name mysql-meetcode -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0

# Use these settings:
spring.datasource.username=root
spring.datasource.password=root
```

## Verification Steps

1. **Test the connection:**
   ```bash
   mysql -u root -p -e "SELECT 1;"
   ```

2. **Create database manually (if needed):**
   ```sql
   CREATE DATABASE meetcode_db;
   ```

3. **Start the Spring Boot application:**
   ```bash
   ./mvnw spring-boot:run
   ```

4. **Check the health endpoint:**
   ```bash
   curl http://localhost:8081/api/health/status
   ```

## Expected Success Output
When working correctly, you should see:
```
Database info:
Database JDBC URL [jdbc:mysql://localhost:3306/meetcode_db]
Database driver: MySQL Connector/J
Database version: 8.0.x
```

## Still Having Issues?

1. **Check MySQL error logs** (usually in MySQL data directory)
2. **Verify MySQL service is running**
3. **Try connecting with a MySQL client** (Workbench, phpMyAdmin, etc.)
4. **Check firewall settings** (port 3306 should be open)

Choose the option that matches your MySQL setup and update the `application.properties` accordingly!