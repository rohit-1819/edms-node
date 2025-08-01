require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');

app.use('/api/users', userRoutes);
app.use('/api', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/duty', assignmentRoutes);
// app.use('/api/users', hodRoutes);

app.get('/api/ping', (req, res) => {
  res.json({ message: "pong" });
});

app.post("/api/test", (req, res) => {
  console.log("✅ /api/test was hit");
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  res.json({ message: "Test route reached" });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
