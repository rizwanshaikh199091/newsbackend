const express = require('express');
const { fetchNews } = require('../controllers/news.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, fetchNews);

router.get('/checkserver', function(req, res){
    res.json({ message: 'Server is up and running!' });
});

module.exports = router;
