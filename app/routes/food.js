const express = require('express')
const router = express.Router()
const foodController = require('../controllers/food')

router.get('/:id', foodController.getFoodById)
router.get('/detail/:id', foodController.getFoodDetailById)
router.post('/new', foodController.createFood)

router.get('/', foodController.getAllFood)
router.put('/:id', foodController.updateFood)
router.delete('/:id', foodController.deleteFood)

module.exports = router