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
const { validateRequestBody, inputLogger, verifyAccessToken } = require('../middlewares')


router.get('/options', getAllOptions)
router.get('/options/:id', getOptionById)
router.get('/carts', getCartItems)

router.get('/', inputLogger, getAllFood)
router.get('/:id', inputLogger, getFoodById)
router.get('/:id/detail', inputLogger, getFoodDetailById)

router.post('/', verifyAccessToken, validateRequestBody([
    'name',
    'price',
    'type',
]), inputLogger, createFood)

router.put('/:id', verifyAccessToken, inputLogger, updateFood)

router.delete('/:id', verifyAccessToken, inputLogger, deleteFood)

module.exports = router