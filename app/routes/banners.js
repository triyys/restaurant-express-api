const express = require('express')
const router = express.Router()
const { getBannerById, getAllBanners, createBanner } = require('../controllers/banner')
const { validateRequestBody, inputLogger } = require('../middlewares')

router.get('/:id', inputLogger, getBannerById)
router.get('/', inputLogger, getAllBanners)
router.post('/', validateRequestBody(['imageUrls']), inputLogger, createBanner)

module.exports = router