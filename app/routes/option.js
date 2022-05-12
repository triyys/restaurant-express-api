const express = require('express');
const router = express.Router();
const food = require('../controllers/food');

router.get('/', food.getOptions);

module.exports = router;