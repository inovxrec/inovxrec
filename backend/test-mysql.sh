#!/bin/bash

echo "Testing MySQL Connection for MeetCode Backend"
echo "============================================="

# Test 1: No password
echo "Test 1: Connecting with no password..."
mysql -u root -e "SELECT 'Connection successful - no password' as result;" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ SUCCESS: Use empty password in application.properties"
    echo "spring.datasource.password="
    exit 0
fi

# Test 2: Password 'root'
echo "Test 2: Connecting with password 'root'..."
mysql -u root -proot -e "SELECT 'Connection successful - password: root' as result;" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ SUCCESS: Use 'root' password in application.properties"
    echo "spring.datasource.password=root"
    exit 0
fi

# Test 3: Password 'password'
echo "Test 3: Connecting with password 'password'..."
mysql -u root -ppassword -e "SELECT 'Connection successful - password: password' as result;" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ SUCCESS: Use 'password' password in application.properties"
    echo "spring.datasource.password=password"
    exit 0
fi

# Test 4: Check if MySQL is running
echo "Test 4: Checking if MySQL service is running..."
if command -v systemctl &> /dev/null; then
    systemctl is-active --quiet mysql
    if [ $? -eq 0 ]; then
        echo "✅ MySQL service is running"
    else
        echo "❌ MySQL service is not running. Start it with: sudo systemctl start mysql"
        exit 1
    fi
elif command -v brew &> /dev/null; then
    brew services list | grep mysql | grep started
    if [ $? -eq 0 ]; then
        echo "✅ MySQL service is running"
    else
        echo "❌ MySQL service is not running. Start it with: brew services start mysql"
        exit 1
    fi
else
    echo "⚠️  Cannot determine MySQL service status"
fi

# Test 5: Check if port 3306 is open
echo "Test 5: Checking if MySQL is listening on port 3306..."
netstat -an 2>/dev/null | grep :3306 | grep LISTEN
if [ $? -eq 0 ]; then
    echo "✅ MySQL is listening on port 3306"
else
    echo "❌ MySQL is not listening on port 3306"
    exit 1
fi

echo ""
echo "❌ All connection tests failed. Please:"
echo "1. Verify MySQL is installed and running"
echo "2. Check your MySQL root password"
echo "3. Try connecting manually: mysql -u root -p"
echo "4. See MYSQL_SETUP.md for detailed instructions"