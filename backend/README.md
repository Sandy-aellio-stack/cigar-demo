# Instagram Backend Server

This is the backend server for Smokies Cigar Lounge website, providing Instagram API integration and admin authentication.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the following variables:
     - `INSTAGRAM_TOKEN`: Your Instagram long-lived access token
     - `ADMIN_USERNAME`: Admin panel username  
     - `ADMIN_PASSWORD`: Admin panel password

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

#### POST `/api/auth/login`
Login to the admin panel.

**Request body:**
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**Response:**
```json
{
  "token": "session_token"
}
```

### Instagram

#### GET `/api/instagram/posts`
Get Instagram posts (public endpoint).

#### POST `/api/instagram/set-token`
Update Instagram token (requires authentication).

**Headers:**
```
Authorization: Bearer <session_token>
```

**Request body:**
```json
{
  "token": "your_instagram_token"
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `INSTAGRAM_TOKEN` | Instagram long-lived access token | No (can be set via admin panel) |
| `ADMIN_USERNAME` | Admin panel username | Recommended (defaults to "smokiecigar") |
| `ADMIN_PASSWORD` | Admin panel password | Recommended (defaults to "smokielanchester") |

## Security Notes

- Admin credentials can be configured via environment variables for security
- Default credentials are provided for development but should be changed in production
- Session tokens are stored in memory and will be cleared on server restart
- All admin endpoints are protected with session-based authentication
- CORS is enabled for all origins (configure as needed for production)
