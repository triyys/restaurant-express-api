const express = require('express')
const router = express.Router()
const { getBannerById, getAllBanners, createBanner } = require('../controllers/banner')
const { validateRequestBody } = require('../middlewares')

router.get('/:id', getBannerById)
router.get('/', getAllBanners)
router.post('/', validateRequestBody(['imageUrls']), createBanner)

module.exports = router