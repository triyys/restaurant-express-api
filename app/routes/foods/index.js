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
const { validateRequestBody } = require('../../middlewares')
const optionsRouter = require('./options')


router.use('/options', optionsRouter)

router.get('/', getAllFood)
router.get('/:id', getFoodById)
router.get('/:id/detail', getFoodDetailById)

router.post('/', validateRequestBody([
    'name',
    'price',
    'type',
]), createFood)

router.put('/:id', updateFood)

router.delete('/:id', deleteFood)

module.exports = router