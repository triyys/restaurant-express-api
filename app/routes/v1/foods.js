const express = require('express')
const router = express.Router()
const {
    getFoodById,
    getFoodDetailById,
    createFood,
    getOnlyFoodCount,
    getAllFood,
    updateFood,
    deleteFood,
    getAllOptions,
    getOptionById,
    getCartItems,
    getTopOrderedFoods,
} = require('@/controllers/food')
const {
    validateRequestBody,
    validateQuery,
    verifyAccessToken,
    validateObjectId,
} = require('@/middlewares')


router.get('/options', getAllOptions)
router.get('/options/:id', validateObjectId('id'), getOptionById)
router.get('/carts', getCartItems)
router.get('/top-food', validateQuery(['count']), getTopOrderedFoods)
router.get('/count', getOnlyFoodCount)

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