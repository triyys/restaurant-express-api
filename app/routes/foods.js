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
const {
    validateRequestBody,
    inputLogger,
    verifyAccessToken,
    validateObjectId,
} = require('../middlewares')


router.get('/options', getAllOptions)
router.get('/options/:id', validateObjectId('id'), getOptionById)
router.get('/carts', getCartItems)

router.get('/', inputLogger, getAllFood)
router.get('/:id', inputLogger, validateObjectId('id'), getFoodById)
router.get('/:id/detail', inputLogger, validateObjectId('id'), getFoodDetailById)

router.post('/', verifyAccessToken, validateRequestBody([
    'name',
    'price',
    'type',
]), inputLogger, createFood)

router.put('/:id', verifyAccessToken, inputLogger, validateObjectId('id'), updateFood)

router.delete('/:id', verifyAccessToken, inputLogger, validateObjectId('id'), deleteFood)

module.exports = router