#!/usr/bin/env python3
"""
Setup script for LeetCode Clone Django Backend
"""
import os
import sys
import subprocess
import django
from django.core.management import execute_from_command_line

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"\n🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        if e.stdout:
            print(f"STDOUT: {e.stdout}")
        if e.stderr:
            print(f"STDERR: {e.stderr}")
        return False

def main():
    print("🚀 Setting up LeetCode Clone Django Backend")
    
    # Set Django settings
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'leetcode_clone.settings')
    
    # Install dependencies
    if not run_command("pip install -r requirements.txt", "Installing dependencies"):
        return False
    
    # Setup Django
    django.setup()
    
    # Make migrations
    print("\n🔄 Creating database migrations...")
    try:
        execute_from_command_line(['manage.py', 'makemigrations'])
        print("✅ Migrations created successfully")
    except Exception as e:
        print(f"❌ Failed to create migrations: {e}")
        return False
    
    # Run migrations
    print("\n🔄 Running database migrations...")
    try:
        execute_from_command_line(['manage.py', 'migrate'])
        print("✅ Database migrations completed")
    except Exception as e:
        print(f"❌ Failed to run migrations: {e}")
        return False
    
    # Populate sample data
    print("\n🔄 Populating sample problems...")
    try:
        execute_from_command_line(['manage.py', 'populate_problems'])
        print("✅ Sample problems added")
    except Exception as e:
        print(f"❌ Failed to populate problems: {e}")
        return False
    
    # Create superuser prompt
    print("\n👤 Create a superuser account for admin access")
    print("You can skip this and create one later with: python manage.py createsuperuser")
    create_superuser = input("Create superuser now? (y/N): ").lower().strip()
    
    if create_superuser == 'y':
        try:
            execute_from_command_line(['manage.py', 'createsuperuser'])
        except Exception as e:
            print(f"❌ Failed to create superuser: {e}")
    
    print("\n🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Copy .env.example to .env and configure your settings")
    print("2. Run the development server: python manage.py runserver")
    print("3. Access the API at: http://localhost:8000/api/")
    print("4. Access admin panel at: http://localhost:8000/admin/")
    print("5. Check the README.md for API documentation")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)