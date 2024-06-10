const express = require('express');
const { fetchNews } = require('../controllers/news.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, fetchNews);

module.exports = router;
