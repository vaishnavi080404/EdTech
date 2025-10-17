require('dotenv').config();
const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const courseRoutes = require('./routes/Course');
const paymentRoutes = require('./routes/Payment');
const profileRoutes = require('./routes/Profile');
const courseProgressRoutes = require('./routes/CourseProgress'); 

const database = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { cloudinaryConnect } = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
database.connectDB();

// Middleware
app.use(express.json());
// Add this line to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],  // ✅ or '*' if testing
  credentials: true,
}));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './temp/',
}));

// ✅ Call this directly
cloudinaryConnect();

// Routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/progress', courseProgressRoutes);

// Default route
app.get("/", (request, response) => {
    response.send('WELCOMEE!');
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});