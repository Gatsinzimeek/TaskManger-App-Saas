# Task Manager SaaS API

A RESTful Backend API for Task Management and Subscription-Based SaaS Platform built using Node.js, Express.js, MongoDB, and JWT Authentication.

---

# Features

- User Authentication using JWT
- Password Hashing using Argon2
- Email Verification using Nodemailer
- Forgot Password System
- Task Management System
- Task Wallet Limitation System
- Subscription Management
- UrubutoPay Payment Integration
- MongoDB Database Integration
- Protected Routes using Middleware
- Payment Verification Logic

---

# Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend Runtime |
| Express.js | API Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Argon2 | Password Hashing |
| Nodemailer | Email Sending |
| Axios | External API Requests |
| dotenv | Environment Variables |
| CORS | Cross-Origin Resource Sharing |

---

# Project Folder Structure

```bash
TaskManagerSaaS/
│
├── Controller/
│   ├── PaymentController.js
│   ├── subscriptionController.js
│   ├── TaskController.js
│   └── UserController.js
│
├── Middleware/
│   └── auth_Middleware.js
│
├── Model/
│   ├── PaymentModel.js
│   ├── SubscriptionModel.js
│   ├── TaskModel.js
│   ├── TaskWalletModel.js
│   ├── task_statement_model.js
│   └── UserModel.js
│
├── services/
│   └── Urubuto.services.js
│
├── utility/
│   ├── nodemailer.js
│   └── validatePhone.js
│
├── config/
│   └── subscriptionPlan.js
│
├── .env
├── index.js
├── package.json
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/TaskManagerSaaS.git
```

## Move Into Project

```bash
cd TaskManagerSaaS
```

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password

URUBUTO_API_KEY=your_api_key
URUBUTO_BASE_URL=your_base_url
URUBUTO_SERVICE_CODE=your_service_code
URUBUTO_MERCHANT_CODE=your_merchant_code
```

---

# Run Project

## Development Mode

```bash
npm run dev
```

## Production Mode

```bash
npm start
```

---

# API Endpoints

# Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register` | Register User |
| POST | `/api/login` | Login User |
| POST | `/api/logout` | Logout User |
| POST | `/api/validateUser` | Validate User Email |
| POST | `/api/change-password` | Change Password |
| POST | `/api/forget-password` | Forgot Password |

---

# Task Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/create-tasks` | Create Task |
| GET | `/api/get-tasks` | Get All Tasks |
| GET | `/api/get-tasks-by-status` | Get Tasks By Status |
| PUT | `/api/update-task/:id` | Update Task |
| PUT | `/api/Change-task-status/:id` | Change Task Status |
| DELETE | `/api/delete-task-Byid/:id` | Delete Task By ID |
| DELETE | `/api/delete-tasks` | Delete All Tasks |

---

# Subscription Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/subscribe` | Subscribe User |
| POST | `/api/payment-verify` | Verify Payment |

---

# Authentication

Protected routes require JWT Token.

Example:

```http
Authorization: Bearer YOUR_TOKEN
```

---

# Subscription Plans

| Plan | Amount | Tasks |
|---|---|---|
| MEDIUM | 20 | 20 Tasks |
| PREMIUM | 50 | 80 Tasks |

---

# Task Wallet Logic

Every new registered user receives:

```text
10 Free Tasks
```

When the task limit is reached, the user must subscribe to continue creating tasks.

---

# Payment Integration

The system integrates with UrubutoPay API for payment processing.

Supported payment channels:

- MOMO
- AIRTEL_MONEY
- CARD

---

# Security Features

- JWT Authentication
- Argon2 Password Hashing
- Protected Routes
- Environment Variable Security
- Token Expiration
- Email Verification

---

# Future Improvements

- Refresh Tokens
- Swagger API Documentation
- Docker Deployment
- Pagination
- Unit Testing
- Role-Based Access Control
- Email Templates

---

# Author

Developed by Gatsinzi Ernest

---
