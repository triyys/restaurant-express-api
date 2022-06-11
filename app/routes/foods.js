const express = require('express')
const router = express.Router()
const {
    getFoodById,
    getFoodDetailById,
    createFood,
    getAllFood,
    updateFood,
    deleteFood,
    getAllOptions,
    getOptionById,
    getCartItems,
} = require('../controllers/food')
const { validateRequestBody } = require('../middlewares')


router.get('/options', getAllOptions)
router.get('/options/:id', getOptionById)
router.get('/carts', getCartItems)

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