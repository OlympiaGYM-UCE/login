# OlympiaGYM-UCE Authentication Server

A simple authentication server implementation for OlympiaGYM-UCE using Node.js, Express, and JWT tokens.

## Features

- User authentication with email and password
- JWT token generation
- Secure password hashing with bcrypt
- CORS enabled
- Environment variable support with dotenv

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/OlympiaGYM-UCE.git
cd OlympiaGYM-UCE
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

## Usage

To start the server:

```bash
npm start
```

## API Endpoints

### POST /api/auth/login

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

**Response:**
```json
{
  "token": "jwt_token_here"
}
```

**Error Response:**
```json
{
  "message": "Invalid credentials"
}
```

## Security

- Passwords are hashed using bcrypt
- Authentication is handled with JWT tokens
- Tokens expire in 1 hour

## Dependencies

- express
- jsonwebtoken
- bcryptjs
- cors
- dotenv

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
