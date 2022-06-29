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
    verifyAccessToken,
    validateObjectId,
} = require('../middlewares')


router.get('/options', getAllOptions)
router.get('/options/:id', validateObjectId('id'), getOptionById)
router.get('/carts', getCartItems)

router.get('/', getAllFood)
router.get('/:id', validateObjectId('id'), getFoodById)
router.get('/:id/detail', validateObjectId('id'), getFoodDetailById)

router.post('/', verifyAccessToken, validateRequestBody([
    'name',
    'price',
    'type',
]), createFood)

router.put('/:id', verifyAccessToken, validateObjectId('id'), updateFood)

router.delete('/:id', verifyAccessToken, validateObjectId('id'), deleteFood)

module.exports = router