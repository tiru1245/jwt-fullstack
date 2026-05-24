# JWT Fullstack Authentication

Full stack JWT authentication system built with Spring Boot and Angular.

## Author
**Tiru** — [@tiru1245](https://github.com/tiru1245)

## Project Structure
jwt-fullstack/
├── backend/    → Spring Boot REST API
└── frontend/   → Angular SPA
## Tech Stack

### Backend
- Java 21
- Spring Boot 3
- Spring Security 6
- MySQL
- JWT (jjwt)
- Lombok

### Frontend
- Angular 17+
- Reactive Forms
- HttpClient
- LocalStorage token management

## Features
- User registration and login
- JWT access token (short-lived)
- Refresh token (stored in DB, 7 days)
- Role-based access control (ADMIN / USER)
- Global exception handling
- Input validation
- CORS configuration

## API Endpoints

| Method | URL | Description | Auth |
|--------|-----|-------------|------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login and get tokens | No |
| POST | /api/auth/refresh | Get new access token | No |
| GET | /api/admin/** | Admin only routes | ADMIN |

## Setup

### Backend
1. Clone the repo
```bash
   git clone https://github.com/tiru1245/jwt-fullstack.git
   cd jwt-fullstack/backend
```

2. Create MySQL database
```sql
   CREATE DATABASE jwtdb;
```

3. Configure `application.properties`
```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/jwtdb
   spring.datasource.username=YOUR_DB_USERNAME
   spring.datasource.password=YOUR_DB_PASSWORD
   jwt.secret=YOUR_SECRET_KEY
   jwt.expiration=86400000
   jwt.refresh-expiration=604800000
   app.admin.email=YOUR_ADMIN_EMAIL
   app.admin.password=YOUR_ADMIN_PASSWORD
```

4. Run
```bash
   mvn spring-boot:run
```

### Frontend
1. Go to frontend folder
```bash
   cd jwt-fullstack/frontend
```

2. Install dependencies
```bash
   npm install
```

3. Run
```bash
   ng serve
```

4. Open browser
 http://localhost:4200

## Security Notes
- JWT secret key must be Base64 encoded and minimum 256 bits
- Never commit real credentials to GitHub
- Access token is short-lived for security
- Refresh token is stored in database and can be revoked
