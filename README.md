# EdTech LMS Platform - StudyNotion

StudyNotion is a fully functional EdTech platform that enables students to browse, purchase, and learn from courses, while providing instructors with a robust dashboard to create and manage their content.

##  Project Overview

The platform is built using the **MERN Stack** (MongoDB, Express, React, Node.js). It features a secure authentication system, media management via Cloudinary, and a seamless payment gateway integration using Razorpay.

##  Key Features

### For Students
* **Course Catalog:** Browse and filter through various categories.
* **Seamless Payments:** Integrated Razorpay for secure course enrollment.
* **Learning Dashboard:** Track progress and access video lectures.
* **Rating & Reviews:** Provide feedback on completed courses.

### For Instructors
* **Course Builder:** Multi-step form to create sections and sub-sections (lectures).
* **Media Management:** Automatic video/image processing via Cloudinary.
* **Instructor Dashboard:** View statistics like total students enrolled and income generated.
* **Course Management:** Publish, unpublish, or delete courses.

##  Tech Stack

**Frontend:**
* React.js (Vite)
* Redux Toolkit (State Management)
* Tailwind CSS
* Framer Motion (Animations)
* Axios (API Integration)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose
* JWT (Authentication & Authorization)
* Razorpay (Payment Gateway)
* Cloudinary (Media Hosting)
* Nodemailer (Email notifications)

---
##  Performance & Tools
Environment: Node.js, Express.js
Database: MongoDB Atlas
Styling: Tailwind CSS, React-Hot-Toast
Animations: Framer Motion
Workflow: Git, GitHub, Postman, Vite

##  Project Structure

The project is structured as a Monorepo for easier development:


EdTech/
├── FRONTEND/        # React application (Vite)
├── BD_Server/       # Node.js Express server
├── package.json     # Root controller to run both together
├── package-lock.json  
└── README.md

## Key Learnings from this Project
* Complexity Management: Handled the logic for nested data structures (Sections > Sub-sections > Videos).
* Security Best Practices: Secured user data through password hashing (bcrypt) and protected private routes on both the frontend and backend.
* Third-Party Integrations: Gained deep experience in connecting external services (Razorpay, Cloudinary, Mailer) to a custom-built API.

