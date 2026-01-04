@echo off
echo Resetting MySQL Root Password to 'root'
echo =====================================

echo Step 1: Stopping MySQL service...
net stop MySQL80

echo Step 2: Creating password reset file...
echo ALTER USER 'root'@'localhost' IDENTIFIED BY 'root'; > C:\mysql-init.txt

echo Step 3: Starting MySQL with init file...
echo This will take a moment...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe" --init-file=C:\mysql-init.txt --console

echo Step 4: Please press Ctrl+C when you see "ready for connections"
echo Then run: net start MySQL80

pause