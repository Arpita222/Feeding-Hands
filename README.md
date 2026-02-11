🍲 Feeding Hands - Food Donation Platform (MERN Stack)

Feeding Hands is a full-stack MERN application designed to reduce food waste by connecting Hotels/Restaurants, NGOs, Volunteers, Donors, and Admins on one platform.
The system allows food donations, volunteer assignments, pickup & delivery tracking, coupon rewards, impact analytics, and real-time notifications.

🚀 Live Demo

🌐 Frontend (Vercel): https://feeding-hands-xi.vercel.app/

🌐 Backend (Render): https://feeding-hands-m10a.onrender.com

📌 Features
🔐 Authentication & Authorization

Role-based login system using JWT + Cookies

Secure protected routes

Multiple user roles:

Admin

Hotel

NGO

Volunteer

Donor

👥 User Roles & Functionalities
🛠 Admin

View and manage all donations

Assign volunteers to NGOs for pickups

Manage users

View analytics dashboard

🏨 Hotel (Food Donor)

Create food donation requests

View donation status updates

Manage donation history

🏢 NGO

View available donations

Accept donation requests

Track pickup requests

Mark donation as delivered

🚚 Volunteer

View assigned pickups

Pick donation

Track pickup status

View completed deliveries history

💰 Donor

Donate money

Earn coupons

View coupons and redemption status

View personal impact statistics

⚡ Advanced Features

Real-time updates using Socket.IO

Scheduled expiry of donations using node-cron

Coupon reward system for donors

Impact analytics dashboard

Responsive modern UI using Tailwind CSS

Professional Dashboard UI with dropdown profile menu

🛠 Tech Stack
Frontend

React.js (Vite)

Tailwind CSS

Axios

React Router DOM

React Icons

Framer Motion

Recharts

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT Authentication

Cookie Parser

Socket.IO

Node Cron

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

📂 Folder Structure

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

⚙️ Installation & Setup (Run Locally)
1️⃣ Clone the Repository
git clone https://github.com/Arpita222/Feeding-Hands.git
cd Feeding-Hands

🖥 Backend Setup
2️⃣ Go to Backend Folder
cd backend

3️⃣ Install Backend Dependencies
npm install

4️⃣ Create .env File in Backend Folder

Create a file:

backend/.env

Add the following:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173

5️⃣ Run Backend Server
npm run dev


Backend will run on:

http://localhost:8000

🌐 Frontend Setup
6️⃣ Go to Frontend Folder
cd ../frontend

7️⃣ Install Frontend Dependencies
npm install

8️⃣ Run Frontend
npm run dev


Frontend will run on:

http://localhost:5173

🔗 API Base URL Setup

In frontend API config file:

frontend/src/services/api.js

Update base URL:

baseURL: "http://localhost:8000/api/v1"


For deployment:

baseURL: "https://feeding-hands-m10a.onrender.com/api/v1"

🔒 Environment Variables (Deployment)
Backend (Render)

Add these variables:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CORS_ORIGIN=https://feeding-hands-xi.vercel.app

🌍 Deployment Guide
✅ Backend Deployment (Render)

Push backend code to GitHub

Create a new Render Web Service

Add environment variables

Deploy backend

✅ Frontend Deployment (Vercel)

Import GitHub repo into Vercel

Set root directory as frontend

Build command:

npm run build


Output directory:

dist


Deploy frontend

🧾 API Modules Implemented

Authentication (Login/Register/Logout)

Donation management

Volunteer assignment

Pickup tracking

Delivery confirmation

Money donation system

Coupon generation & redemption

Analytics reporting

📊 Future Enhancements

User Profile page with update details

Settings page (theme, password update, preferences)

Payment gateway integration (Razorpay / Stripe)

OTP email verification

Admin approval system for NGOs

👩‍💻 Developer

Arpita Yelpale
📍 Pune, India
📧 Email: arpitayelpale1593@gmail.com

🔗 GitHub: https://github.com/Arpita222

⭐ Support

If you like this project, don’t forget to give it a ⭐ on GitHub!

📜 License

This project is licensed under the ISC License.