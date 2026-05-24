# Spring Boot JWT Authentication

Complete JWT implementation with Access Token + Refresh Token.

## Tech Stack
- Java 21
- Spring Boot 3.2
- Spring Security 6
- JJWT 0.12.3
- PostgreSQL
- Lombok

## Setup

### 1. Create PostgreSQL Database
```sql
CREATE DATABASE jwtdb;
```

### 2. Update application.properties
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Run the application
```bash
mvn spring-boot:run
```

## API Endpoints

### Register
```
POST /api/auth/register
{
  "email": "tiru@gmail.com",
  "password": "password123"
}
```

### Login
```
POST /api/auth/login
{
  "email": "tiru@gmail.com",
  "password": "password123"
}
Response:
{
  "accessToken": "eyJhbG...",
  "refreshToken": "uuid-refresh-token",
  "tokenType": "Bearer",
  "expiresIn": 86400000
}
```

### Refresh Token
```
POST /api/auth/refresh
{
  "refreshToken": "uuid-refresh-token"
}
```

### Get Profile (Protected)
```
GET /api/profile
Authorization: Bearer eyJhbG...
```

### Get Payments (Protected)
```
GET /api/payments
Authorization: Bearer eyJhbG...
```

### Get All Users (Admin Only)
```
GET /api/admin/users
Authorization: Bearer eyJhbG...
```

## JWT Token Structure
```
Header: { "alg": "HS256", "typ": "JWT" }
Payload: { "sub": "email", "iat": timestamp, "exp": timestamp }
Signature: HMAC-SHA256(header + payload, secret)
```

## Security Flow
1. User registers/logs in → receives accessToken + refreshToken
2. Use accessToken in Authorization header for API calls
3. When accessToken expires → use refreshToken to get new one
4. RefreshToken expires → user must login again

Docker
docker build -t jwt-demo:1.0 .
docker images | grep jwt-demo
docker run -d --network host --name my-running-app jwt-demo:1.0






