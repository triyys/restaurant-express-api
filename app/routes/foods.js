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
const { validateRequestBody, inputLogger } = require('../middlewares')


router.get('/options', getAllOptions)
router.get('/options/:id', getOptionById)
router.get('/carts', getCartItems)

router.get('/', inputLogger, getAllFood)
router.get('/:id', inputLogger, getFoodById)
router.get('/:id/detail', inputLogger, getFoodDetailById)

router.post('/', validateRequestBody([
    'name',
    'price',
    'type',
]), createFood)

router.put('/:id', inputLogger, updateFood)

router.delete('/:id', inputLogger, deleteFood)

module.exports = router