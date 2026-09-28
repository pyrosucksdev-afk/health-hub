# 🏥 HealthHub - Hospital & Healthcare Management System

HealthHub is a full-stack web application built to streamline healthcare services, user registration, doctor appointments, and patient checkup records management.

---

## 🚀 Features

- **User Authentication**: Secure Signup and Login for patients and doctors using JWT (JSON Web Tokens) and bcrypt password hashing.
- **Appointment Scheduling**: Patients can easily book appointments with doctors, select time slots, view status, and cancel bookings if necessary.
- **Checkup & Medical Records**: System for recording medical checkups, doctor notes, and prescriptions.
- **Informational Portal**: Dedicated web pages showcasing hospital services, medical departments, doctor profiles, and contact details.

---

## 🛠️ Technology Stack

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JSON Web Token (`jsonwebtoken`) & `bcrypt`
- **Validation**: `zod`
- **Cross-Origin**: `cors`

### **Frontend**
- **Core**: HTML5, CSS3, JavaScript (ES6+)
- **API Integration**: REST API consumption using Fetch API

---

## 📁 Project Architecture

```text
HealthHub/
├── backend/
│   ├── config/
│   │   └── db.js            # MongoDB connection & Mongoose schemas (User, Appointment, Checkup)
│   ├── middleware/
│   │   └── authentication.js # JWT authentication middleware
│   ├── routes/
│   │   ├── index.js          # Main API router aggregator
│   │   ├── user.js           # Auth routes (Signup, Login, User fetch)
│   │   ├── appointment.js    # Appointment routes (Book, Cancel, View)
│   │   └── checkup.js        # Medical checkup & prescription routes
│   ├── index.js              # Express app entry point (Runs on port 3000)
│   ├── token.js              # JWT secret key configuration
│   └── package.json
└── frontend/
    ├── page.html             # Home page
    ├── login.html            # User login
    ├── signup.html           # User signup
    ├── appointment.html      # Appointment booking page
    ├── appointment_success.html # Appointment confirmation
    ├── doctor.html           # Doctors list & profiles
    ├── department.html       # Medical departments
    ├── services.html         # Hospital services
    └── contact.html          # Contact us & inquiries page
```

---

## 🔌 API Endpoints Summary

 Base URL: `http://localhost:3000/api/auth`

### **User & Authentication** (`/user`)
- `POST /user/signup` — Register a new patient or doctor.
- `POST /user/login` — Authenticate user and receive JWT.
- `GET /user/bulk` — Search or filter users (e.g., doctors/patients).

### **Appointments** (`/appointment`)
- `POST /appointment/book` — Book a new appointment.
- `DELETE /appointment/cancel` — Cancel an existing appointment.
- `GET /appointment/doctor` — Fetch scheduled appointments for a doctor.

### **Checkups** (`/checkup`)
- `POST /checkup/create` — Create a new patient checkup record.
- `GET /checkup/history` — Fetch checkup history for a patient.

---

## 💻 Getting Started

### **Prerequisites**
1. [Node.js](https://nodejs.org/) (v16 or higher recommended)
2. [MongoDB](https://www.mongodb.com/) running locally on default port `27017` (URI: `mongodb://localhost:27017/hospital_management`)

### **1. Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the backend server
node index.js
```
The backend server will run on `http://localhost:3000`.

### **2. Frontend Setup**

- Open `frontend/page.html` in your web browser (or serve the `frontend` folder using a static web server like Live Server in VS Code).

---

## 📜 License

This project is licensed under the ISC License.
