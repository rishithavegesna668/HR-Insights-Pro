# HR Insights Pro – Employee Management & Analytics System

A full-stack MERN application designed to manage employee records and visualize workforce information through an interactive HR dashboard.

## Features

- Interactive HR analytics dashboard
- Add new employee records
- View employee information
- Search employees
- Delete employee records
- Dynamic employee statistics
- Department-wise workforce overview
- MongoDB database integration

## Tech Stack

**Frontend:** React.js, Vite, CSS

**Backend:** Node.js, Express.js

**Database:** MongoDB Atlas

**Tools:** VS Code, Git, GitHub, Postman

## Project Structure

```text
HR-Insights-Pro/
├── client/
│   └── src/
│       ├── services/
│       ├── App.jsx
│       └── App.css
└── server/
    ├── config/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rishithavegesna668/HR-Insights-Pro.git
cd HR-Insights-Pro
```

### 2. Start the backend

```bash
cd server
npm install
```

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

### 3. Start the frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | Get employees |
| POST | `/api/employees` | Add employee |
| GET | `/api/employees/:id` | Get employee by ID |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

## Project Objective

The objective of HR Insights Pro is to simplify employee management and provide workforce insights through a centralized web application.

## Author

**Rishitha Rajeswari Vegesna**

GitHub: [rishithavegesna668](https://github.com/rishithavegesna668)
