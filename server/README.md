Saaro Health - Clinic Management System

A Node.js + Express + MongoDB backend for managing a health clinic, including users, patients, doctors, and appointments. This project uses JWT authentication, role-based authorization, and Swagger API documentation.

📁 Project Structure
saaro-health/
│
├─ src/
│   ├─ config/
│   │   └─ db.js               # MongoDB connection
│   │
│   ├─ middlewares/
│   │   ├─ auth.middleware.js  # JWT authentication
│   │   ├─ authorize.middleware.js # Role-based authorization
│   │   └─ error.middleware.js # Global error handler
│   │
│   ├─ modules/
│   │   ├─ user/
│   │   │   ├─ user.model.js
│   │   │   ├─ user.controller.js
│   │   │   └─ user.routes.js
│   │   ├─ patient/
│   │   └─ doctor/
│   │
│   ├─ routes.js               # Main route aggregator
│   ├─ swagger.js              # Swagger setup
│   └─ server.js               # Entry point
│
├─ .env                        # Environment variables
├─ package.json
├─ package-lock.json
└─ nodemon.json

⚡ Features

User registration and login

JWT authentication

Role-based authorization (admin, sub_admin, doctor, sub_agent, patient)

Manage patients and doctors

Swagger API documentation at /api-docs

Global error handling

🛠 Installation

Clone the repository:

git clone <repo-url> saaro-health
cd saaro-health


Install dependencies:

npm install


Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Start the server:

npm run dev

🚀 API Endpoints
User Routes
Method	Endpoint	Description
POST	/api/users/register	Register a new user
POST	/api/users/login	Login a user
GET	/api/users	Get all users (admin only)

Swagger documentation:

http://localhost:5000/api-docs

📝 Middlewares

authMiddleware – Verifies JWT token

authorize – Role-based access control

errorHandler – Handles errors globally

💾 Database

MongoDB is used with Mongoose.

User Schema Fields:

name, phone, email, password

role (admin, sub_admin, doctor, sub_agent, patient)

otp, otpExpiry, isOtpVerified

isActive, isBlocked, lastLogin

Other schemas: Doctor, Patient, and DoctorProfile (linked via references).

📌 Notes

Ensure MongoDB is running and accessible.

Swagger will auto-generate docs from JSDoc comments in route files.

All routes are CommonJS style using require and module.exports.

🔑 Environment Variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


This README is ready to use as the main documentation for your Saaro Health backend project.