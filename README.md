# Role-Based Task Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application implementing secure authentication, role-based authorization, task management, user management, and a task calendar. 

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication  
- Password hashing using bcrypt  
- Protected API routes  
- Role-based UI rendering  

### 🧑‍💼 Role Permissions

#### 👑 Admin
- Create, edit, delete tasks  
- Assign tasks to any user  
- Update user roles  
- View all tasks  
- Manage users  

#### 🧑‍💼 Manager
- Create and assign tasks  
- View team tasks  
- Update assigned tasks  

#### 👤 User
- View only own tasks  
- Update task status  

---

## 📅 Calendar Functionality
- Built using **FullCalendar**  
- Month / Week / Day views  
- Tasks displayed on due dates  
- Click a date → view tasks scheduled  
- Role-based visibility (Admin sees all, Manager sees team, User sees personal tasks)

---

## 📁 Project Structure

```
Assignment/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env (ignored)
│
└── frontend/
    ├── public/
    ├── src/
    │ ├── api/
    │ ├── components/
    │ ├── context/
    │ ├── layouts/
    │ ├── pages/
    │ ├── router/
    │ ├── App.css
    │ ├── App.js
    │ ├── index.css
    │ └── index.js
    |
    ├── .gitignore
    ├── package-lock.json
    └── package.json
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/sangeetamittal/Role-Based-Task-Management-System.git
cd Role-Based-Task-Management-System
```

---

## 🔧 Backend Setup (Node.js)

```bash
cd backend
npm install
```

### Backend `.env`
```
PORT=5000
MONGO_URI=mongodb+srv://projectTester:S3cure!ProjTest2025@cluster-task.yiqn2yh.mongodb.net/?appName=Cluster-Task
JWT_SECRET=your_secret
```
Note: Use the given Mongo URL, it is for testing.

### Start Backend
```bash
nodemon ./server.js
```

---

## 💻 Frontend Setup (React)

```bash
cd frontend
npm install
```

### Start Frontend
```bash
npm start
```

---

## 🧪 Test Accounts (Sample)

| Role | Email | Password |
|------|--------|----------|
| Admin | admin@test.com | password |
| Manager | manager@test.com | password |
| User | user@test.com | password |

---

## 📌 API Overview

### Auth
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/auth/signup` | Register user |
| POST | `/auth/login` | Login + JWT |

### Users
| Method | Route | Description |
|--------|--------|-------------|
| GET | `/users` | Get all users |
| PATCH | `/users/:id/role` | Update role |
| DELETE | `/users/:id` | Delete user |

### Tasks
| Method | Route | Description |
|--------|--------|-------------|
| GET | `/tasks` | Get tasks |
| GET | `/tasks/:id` | Get task by id |
| POST | `/tasks` | Create task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

---

## 🔥 Postman Collection

[Click here to view the Postman Collection](https://www.postman.com/sangeeta-mittal-2003/workspace/role-based-task-management-system/collection/41095019-2fa78b5f-4c00-4947-b62e-07b9fbe9ec19?action=share&creator=41095019)


---
## 🛡️ Security
- No password returned in responses  
- bcrypt hashing  
- JWT expiry  
- Role-based middleware  
- Validation using express-validator  

---

## 🎨 UI Highlights
- Modern Login & Signup UI  
- Sidebar navigation  
- Calendar UI  
- Smooth UX  

---

## 📘 Requirements Covered
✔ JWT Authentication  
✔ Role Authorization  
✔ Task Management  
✔ User Management  
✔ Calendar View  
✔ Pagination & Search  
✔ Mongo, Express, React, Node structure  

---

## 👩‍💻 Author
**Sangeeta Mittal**  
GitHub: https://github.com/sangeetamittal  

---
