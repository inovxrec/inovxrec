# Reset MySQL Root Password Guide

## For Windows Users

### Method 1: Using MySQL Workbench
1. Open MySQL Workbench
2. Go to Server → Users and Privileges
3. Select root user
4. Click "Reset Password"
5. Set new password (e.g., "root")

### Method 2: Using Command Line
1. **Stop MySQL Service:**
   - Press `Win + R`, type `services.msc`
   - Find "MySQL80" (or similar), right-click → Stop

2. **Create password reset file:**
   - Create file `C:\mysql-init.txt` with content:
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
   ```

3. **Start MySQL with init file:**
   ```cmd
   cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
   mysqld --init-file=C:\mysql-init.txt
   ```

4. **Stop and restart MySQL service normally**

5. **Test connection:**
   ```cmd
   mysql -u root -proot
   ```

### Method 3: Safe Mode (Windows)
1. **Stop MySQL Service**
2. **Open Command Prompt as Administrator**
3. **Navigate to MySQL bin directory:**
   ```cmd
   cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
   ```
4. **Start MySQL in safe mode:**
   ```cmd
   mysqld --skip-grant-tables --skip-networking
   ```
5. **Open another Command Prompt and connect:**
   ```cmd
   mysql -u root
   ```
6. **Reset password:**
   ```sql
   USE mysql;
   UPDATE user SET authentication_string=PASSWORD('root') WHERE User='root';
   FLUSH PRIVILEGES;
   EXIT;
   ```
7. **Stop safe mode MySQL and restart service**

## For Linux/Mac Users

### Method 1: Using sudo (Linux)
```bash
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;
EXIT;
```

### Method 2: Safe Mode (Linux/Mac)
```bash
# Stop MySQL
sudo systemctl stop mysql  # Linux
# or
brew services stop mysql   # Mac

# Start in safe mode
sudo mysqld_safe --skip-grant-tables --skip-networking &

# Connect and reset
mysql -u root
USE mysql;
UPDATE user SET authentication_string=PASSWORD('root') WHERE User='root';
FLUSH PRIVILEGES;
EXIT;

# Restart MySQL
sudo systemctl start mysql  # Linux
# or
brew services start mysql   # Mac
```

## Verification
After resetting, test the connection:
```bash
mysql -u root -proot -e "SELECT 'Password reset successful!' as result;"
```

## Update Application Configuration
Once password is reset to 'root', your current `application.properties` should work:
```properties
spring.datasource.username=root
spring.datasource.password=root
```