
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/issues', async (req, res) => {
  const issues = await prisma.issue.findMany({ include: { user: true } });
  res.json(issues);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
