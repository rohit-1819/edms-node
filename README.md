
# 📘 Electronic Duty Management System (EDMS) – API Documentation

A backend system for managing election duties, employees, posts, and assignments. Built with **Node.js**, **Express**, and **PostgreSQL**.

---

## 📦 Installation & Setup

```bash
git clone https://github.com/rohit-1819/edms-node.git
cd edms-node
npm install
cp .env.example .env   # Fill with DB credentials
```

Start the server:

```bash
npm start
```

---

## 🔐 Authentication

All protected routes require a `Bearer Token` in the `Authorization` header after login.

---

## 📌 API Endpoints

### 🔑 Auth

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| `POST` | `/api/login`      | Login HOD or DM account. Returns JWT token. |

#### Example:

```bash
curl -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{"email": "rohit@edms.com", "password": "your_password"}'
```

---

### 👤 Users (HOD & DM)

| Method | Endpoint              | Description                       |
|--------|-----------------------|-----------------------------------|
| `GET`  | `/api/users/:id`      | Get user details by ID            |
| `POST` | `/api/users` *(DM only)* | Create HOD account manually     |

---

### 👥 Employees

| Method | Endpoint                     | Description                               |
|--------|------------------------------|-------------------------------------------|
| `POST` | `/api/employees`             | HOD creates an employee under department  |
| `GET`  | `/api/employees/:hod_id`     | List employees created by a HOD           |
| `GET`  | `/api/employees`             | Admin overview of all employees           |

---

### 📢 Posts (Public & Private Posts by DM)

| Method | Endpoint          | Description                        |
|--------|-------------------|------------------------------------|
| `POST` | `/api/posts`      | DM creates a post (public/private) |
| `GET`  | `/api/posts/:id`  | HOD fetches all relevant posts     |

---

### 🗳️ Polling Stations

| Method | Endpoint                  | Description                            |
|--------|---------------------------|----------------------------------------|
| `POST` | `/api/stations`           | Add polling station                    |
| `GET`  | `/api/stations`           | Get list of all polling stations       |

---

### 👔 Designations

| Method | Endpoint               | Description                   |
|--------|------------------------|-------------------------------|
| `POST` | `/api/designations`    | Add required designations     |
| `GET`  | `/api/designations`    | List all designations         |

---

### 🎯 Assignments (Election Duty Randomization)

| Method | Endpoint               | Description                                   |
|--------|------------------------|-----------------------------------------------|
| `POST` | `/api/assignments/run` | Assign employees using rule-based algorithm   |
| `GET`  | `/api/assignments`     | View current duty assignments                 |

---

### 🧪 Health Check

| Method | Endpoint     | Description         |
|--------|--------------|---------------------|
| `GET`  | `/api/ping`  | Basic server check  |

---

## 🛠️ Technologies Used

- Node.js + Express
- PostgreSQL
- Supabase (alternative backend)
- JWT for auth
- Bcrypt for password hashing

---

## 🔐 Environment Variables (`.env`)

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=edms_user
DB_PASS=edms_pass
DB_NAME=edmsdb
JWT_SECRET=your_jwt_secret
```

---

## ✅ TODO

- [ ] Frontend integration
- [ ] Add RLS rules (for Supabase)
- [ ] Export logs and reports
