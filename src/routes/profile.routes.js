const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profile.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', auth, getProfile);
router.put('/', auth, updateProfile);

module.exports = router;
