const express = require('express')
const router = express.Router()
const {
    getFoodById,
    getFoodDetailById,
    createFood,
    getAllFood,
    updateFood,
    deleteFood,
} = require('../../controllers/food')
const optionsRouter = require('./options')

router.get('/:id', getFoodById)
router.get('/detail/:id', getFoodDetailById)
router.get('/', getAllFood)
router.post('/new', createFood)
router.put('/:id', updateFood)
router.delete('/:id', deleteFood)

router.use('/options', optionsRouter)

module.exports = router