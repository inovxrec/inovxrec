# Quick Start Guide - Fix MySQL Connection

Choose ONE of these three solutions:

## 🚀 SOLUTION 1: Use Development Profile (No Password)

**Best for:** XAMPP, WAMP, or fresh MySQL installations

### Step 1: Test if root has no password
```bash
mysql -u root
```

### Step 2: If successful, run with dev profile
```bash
cd backend
./mvnw spring-boot:run -Dspring.profiles.active=dev
```

### Step 3: Verify it works
- Application should start without errors
- Visit: http://localhost:8081/api/health/status

---

## 🔧 SOLUTION 2: Create New MySQL User (RECOMMENDED)

**Best for:** Production-like setup with dedicated user

### Step 1: Connect to MySQL as root
```bash
# Try different passwords
mysql -u root -p
# Common passwords: root, password, admin, or empty
```

### Step 2: Run the user creation script
```bash
mysql -u root -p < create-mysql-user.sql
```

### Step 3: Update application to use new user
```bash
./mvnw spring-boot:run -Dspring.profiles.active=newuser
```

### Step 4: Verify it works
- Application should start successfully
- New user 'meetcode' with password 'meetcode123' is created

---

## 🔑 SOLUTION 3: Reset MySQL Root Password

**Best for:** When you don't know the current root password

### For Windows:
1. **Stop MySQL Service** (services.msc → MySQL80 → Stop)
2. **Create reset file** `C:\mysql-init.txt`:
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
   ```
3. **Run MySQL with init file:**
   ```cmd
   cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
   mysqld --init-file=C:\mysql-init.txt
   ```
4. **Restart MySQL service normally**
5. **Test:** `mysql -u root -proot`

### For Linux/Mac:
```bash
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;
EXIT;
```

### Step 2: Run application with root password
```bash
./mvnw spring-boot:run
```

---

## 🎯 Quick Test Commands

### Test MySQL Connection:
```bash
# No password
mysql -u root

# With password 'root'
mysql -u root -proot

# With new user
mysql -u meetcode -pmeetcode123
```

### Test Application:
```bash
# Default profile (password: root)
./mvnw spring-boot:run

# Dev profile (no password)
./mvnw spring-boot:run -Dspring.profiles.active=dev

# New user profile
./mvnw spring-boot:run -Dspring.profiles.active=newuser
```

### Verify Success:
```bash
curl http://localhost:8081/api/health/status
```

**Expected Response:**
```json
{
  "database": "Connected",
  "databaseUrl": "jdbc:mysql://localhost:3306/meetcode_db",
  "userRepository": "Working",
  "userCount": 0,
  "status": "UP"
}
```

---

## 🆘 Still Having Issues?

1. **Check MySQL is running:**
   ```bash
   # Windows
   net start mysql
   
   # Linux
   sudo systemctl status mysql
   
   # Mac
   brew services list | grep mysql
   ```

2. **Check port 3306:**
   ```bash
   netstat -an | grep 3306
   ```

3. **Run the test script:**
   ```bash
   # Windows
   test-mysql.bat
   
   # Linux/Mac
   bash test-mysql.sh
   ```

Choose the solution that works for your setup and follow the steps!