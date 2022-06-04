const express = require('express')
const router = express.Router()
const { getAllOptions, getOptionById } = require('../../controllers/food')

router.get('/', getAllOptions)
router.get('/:id', getOptionById)

module.exports = router