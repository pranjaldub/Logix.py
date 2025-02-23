import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Basic route
app.get('/api', (req, res) => {
  res.send('makeasite.io');
});

// Health Check
app.get('/health', (req, res) => {
  res.send('OK');
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});