# 🍲 Feeding Hands - Food Donation Platform (MERN Stack)

Feeding Hands is a full-stack MERN application designed to reduce food waste by connecting **Hotels/Restaurants**, **NGOs**, **Volunteers**, **Donors**, and **Admins** on one platform.  
The system enables food donations, volunteer assignments, pickup & delivery tracking, coupon rewards, impact analytics, and real-time updates.

---

## 🚀 Live Demo

🌐 Frontend (Vercel): https://feeding-hands-xi.vercel.app/  
🌐 Backend (Render): https://feeding-hands-m10a.onrender.com  

---

## 📌 Features

### 🔐 Authentication & Authorization
- Role-based authentication using JWT + Cookies
- Secure protected routes
- Multiple user roles:
  - Admin
  - Hotel
  - NGO
  - Volunteer
  - Donor

---

## 👥 User Roles & Functionalities

### 🛠 Admin
- View and manage all donations
- Assign volunteers to donation pickups
- Manage users
- View analytics dashboard

### 🏨 Hotel
- Create food donation requests
- View donation status updates
- Track donation history

### 🏢 NGO
- View available donations
- Accept donation requests
- Track pickup requests
- Mark donation as delivered

### 🚚 Volunteer
- View assigned pickups
- Pick donation
- Update pickup status
- View completed deliveries history

### 💰 Donor
- Donate money
- Earn coupons
- View coupon redemption status
- Track personal impact

---

## ⚡ Advanced Features
- Real-time updates using Socket.IO
- Donation expiry scheduling using node-cron
- Coupon reward system
- Impact analytics dashboard
- Responsive modern UI using Tailwind CSS
- Professional dashboard layout with profile dropdown menu

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- React Icons
- Framer Motion
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Cookie Parser
- Socket.IO
- Node Cron

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Folder Structure

Feeding_Hands/
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env
│
└── README.md

---

## ⚙️ Installation & Setup (Run Locally)

### 1️⃣ Clone the Repository
git clone https://github.com/Arpita222/Feeding-Hands.git  
cd Feeding-Hands  

---

## 🖥 Backend Setup

### 2️⃣ Go to Backend Folder
cd backend  

### 3️⃣ Install Dependencies
npm install  

### 4️⃣ Create `.env` File in Backend Folder
Create file: backend/.env

Add:

PORT=8000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
CORS_ORIGIN=http://localhost:5173  

### 5️⃣ Run Backend Server
npm run dev  

Backend will run on:
http://localhost:8000  

---

## 🌐 Frontend Setup

### 6️⃣ Go to Frontend Folder
cd ../frontend  

### 7️⃣ Install Dependencies
npm install  

### 8️⃣ Run Frontend
npm run dev  

Frontend will run on:
http://localhost:5173  

---

## 🔗 API Base URL Setup

File: frontend/src/services/api.js

For local:
baseURL: "http://localhost:8000/api/v1"

For deployed backend:
baseURL: "https://feeding-hands-m10a.onrender.com/api/v1"

---

## 🔒 Environment Variables (Deployment)

### Backend (Render)
Add these in Render Environment Variables:

PORT=8000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
CORS_ORIGIN=https://feeding-hands-xi.vercel.app  

---

## 🌍 Deployment Guide

### ✅ Backend Deployment (Render)
- Push backend code to GitHub
- Create a new Render Web Service
- Add environment variables
- Deploy backend

### ✅ Frontend Deployment (Vercel)
- Import GitHub repo into Vercel
- Select root directory as frontend
- Build command: npm run build
- Output directory: dist
- Deploy frontend

---

## 🧾 Major Modules Implemented
- Authentication (Login/Register/Logout)
- Donation management system
- Volunteer assignment
- Pickup & delivery tracking
- Money donation system
- Coupon reward system
- Analytics reporting dashboard
- Real-time notifications (Socket.IO)

---

## 📊 Future Enhancements
- Profile page with user update option
- Settings page (password update, preferences)
- Payment gateway integration (Razorpay / Stripe)
- Email verification & OTP login
- Admin approval for NGOs

---

## 👩‍💻 Developer

Arpita Yelpale  
📍 Pune, India  
📧 Email: arpitayelpale1593@gmail.com  
🔗 GitHub: https://github.com/Arpita222  

---

## ⭐ Support

If you like this project, don’t forget to give it a ⭐ on GitHub!

---

## 📜 License

This project is licensed under the ISC License.
