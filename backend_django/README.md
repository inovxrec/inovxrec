# LeetCode Clone - Django Backend

A Django REST API backend for a LeetCode-style coding platform with user authentication, problem management, and code execution.

## Features

- **User Authentication**: JWT-based authentication with registration, login, and profile management
- **Problem Management**: CRUD operations for coding problems with difficulty levels, tags, and examples
- **Code Execution**: Integration with Judge0 API for running and evaluating code submissions
- **Progress Tracking**: User statistics, problem-solving progress, and submission history
- **Admin Interface**: Django admin for managing problems, users, and submissions

## Tech Stack

- **Framework**: Django 4.2 + Django REST Framework
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Database**: SQLite (development) / PostgreSQL (production)
- **Code Execution**: Judge0 API
- **Task Queue**: Celery + Redis
- **CORS**: django-cors-headers

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/profile/` - Get user profile
- `GET /api/auth/stats/` - Get user statistics
- `POST /api/auth/token/refresh/` - Refresh JWT token

### Problems
- `GET /api/problems/` - List problems (with filtering)
- `GET /api/problems/<slug>/` - Get problem details
- `GET /api/problems/tags/` - Get all tags
- `GET /api/problems/stats/` - Get problem statistics

### Submissions
- `GET /api/submissions/` - List user submissions
- `GET /api/submissions/<id>/` - Get submission details
- `POST /api/submissions/run/` - Run code against sample test case
- `POST /api/submissions/submit/` - Submit code for evaluation

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Environment Setup

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Edit `.env` with your settings:
- Set `SECRET_KEY`
- Configure `JUDGE0_API_KEY` if you have one
- Set database URL if using PostgreSQL

### 3. Database Setup

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### 4. Populate Sample Data

```bash
python manage.py populate_problems
```

### 5. Run Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/`

## Docker Setup

### Development with Docker Compose

```bash
docker-compose up --build
```

This will start:
- Django web server on port 8000
- PostgreSQL database on port 5432
- Redis on port 6379
- Celery worker for background tasks

### Production Docker

```bash
docker build -t leetcode-backend .
docker run -p 8000:8000 leetcode-backend
```

## Configuration

### Judge0 API

The backend uses Judge0 API for code execution. You can:

1. Use the free public instance (default)
2. Set up your own Judge0 instance
3. Get a RapidAPI key for higher limits

Configure in `.env`:
```
JUDGE0_API_URL=https://ce.judge0.com
JUDGE0_API_KEY=your-rapidapi-key
```

### Supported Languages

- JavaScript (Node.js)
- Python 3
- Java
- C++

Language IDs are mapped in `submissions/views.py`.

## API Usage Examples

### Register User
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "confirm_password": "testpass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

### Get Problems
```bash
curl -X GET "http://localhost:8000/api/problems/?difficulty=easy&tag=Array"
```

### Submit Code
```bash
curl -X POST http://localhost:8000/api/submissions/submit/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "code": "function twoSum(nums, target) { return [0, 1]; }",
    "language": "javascript",
    "problem_id": 1
  }'
```

## Frontend Integration

This backend is designed to work with the React frontend. Key integration points:

1. **CORS**: Configured for `localhost:5173` (Vite) and `localhost:3000` (React)
2. **JWT Authentication**: Tokens should be stored in localStorage and sent in Authorization header
3. **API Base URL**: Set frontend API base URL to `http://localhost:8000/api/`

## Development

### Adding New Problems

1. Use Django admin at `/admin/`
2. Or use the management command:
   ```bash
   python manage.py populate_problems
   ```
3. Or create via API (admin users only)

### Database Migrations

After model changes:
```bash
python manage.py makemigrations
python manage.py migrate
```

### Running Tests

```bash
python manage.py test
```

## Production Deployment

1. Set `DEBUG=False` in environment
2. Configure proper database (PostgreSQL recommended)
3. Set up Redis for Celery
4. Configure static files serving
5. Use gunicorn or similar WSGI server
6. Set up reverse proxy (nginx)
7. Configure SSL/TLS

## Troubleshooting

### Judge0 API Issues
- Check API key and URL configuration
- Verify network connectivity
- Check rate limits

### CORS Issues
- Ensure frontend URL is in `CORS_ALLOWED_ORIGINS`
- Check that credentials are being sent properly

### Database Issues
- Run migrations: `python manage.py migrate`
- Check database connection settings
- Ensure database server is running

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.