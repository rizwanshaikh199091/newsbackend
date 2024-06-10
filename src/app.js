const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const newsRoutes = require('./routes/news.routes');
const profileRoutes = require('./routes/profile.routes');

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/profile', profileRoutes);

module.exports = app;
