# Create MySQL User using MySQL Workbench

## Step 1: Open MySQL Workbench
1. Launch MySQL Workbench
2. Connect to your local MySQL instance (usually localhost:3306)
3. Enter your root password when prompted

## Step 2: Create the Database
1. Click on "Schemas" tab in the left sidebar
2. Right-click in the empty area → "Create Schema"
3. Name: `meetcode_db`
4. Click "Apply" → "Apply" → "Finish"

## Step 3: Create the User
1. Go to "Server" menu → "Users and Privileges"
2. Click "Add Account" button
3. Fill in the details:
   - **Login Name**: `meetcode`
   - **Limit to Hosts Matching**: `localhost`
   - **Password**: `meetcode123`
   - **Confirm Password**: `meetcode123`

## Step 4: Grant Privileges
1. Still in "Users and Privileges", select the `meetcode` user
2. Go to "Schema Privileges" tab
3. Click "Add Entry..."
4. Select "Selected schema" → choose `meetcode_db`
5. Click "OK"
6. In the privileges list, check "ALL" (this will select all privileges)
7. Click "Apply"

## Step 5: Verify the User
1. Go to "Query" tab (or open a new SQL tab)
2. Run this query to verify:
```sql
SELECT User, Host FROM mysql.user WHERE User = 'meetcode';
```
3. You should see the `meetcode` user listed

## Step 6: Test Connection
1. Create a new connection in MySQL Workbench
2. Connection Name: `MeetCode App`
3. Hostname: `localhost`
4. Port: `3306`
5. Username: `meetcode`
6. Password: `meetcode123`
7. Click "Test Connection" - should succeed

You're now ready to run the Spring Boot application!