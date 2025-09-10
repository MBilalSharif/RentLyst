// server.js (only showing relevant bits)
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const rentalRoutes = require('./routes/rentalRoutes');
const path = require('path');

const app = express();

// Serve uploaded images
// app.use('/upload', express.static(path.join(process.cwd(), 'upload')));
// app.use("/upload", express.static(path.join(__dirname, "upload"))); 

// Core middleware
app.use(cors());
app.use(express.json());

// Routes

app.use('/api/rentals', rentalRoutes);
app.use('/api/auth', authRoutes);

// DB + server
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas connected!'))
  .catch((error) => console.error('MongoDB connection error:', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
