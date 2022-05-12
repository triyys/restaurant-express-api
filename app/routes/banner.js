const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/banner');

router.get('/', bannerController.getBanner);

module.exports = router;