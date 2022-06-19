const BannerModel = require('../models/BannerModel')
const { getMongoDocById, getMongoCollection, customResponse } = require('../utils')

// [GET] /banners/:id
const getBannerById = getMongoDocById(BannerModel)

// [GET] /banners
const getAllBanners = getMongoCollection(BannerModel)

// [POST] /banners
const createBanner = (req, res, next) => {
    const { imageUrls } = req.body
    BannerModel.create({ imageUrls })
        .then((banner) => {
            return res
                .location(`${req.originalUrl}/${banner._id}`)
                .status(201)
                .send(customResponse(`Banner ${banner._id} is created`))
        })
        .catch(next)
}

module.exports = {
    getBannerById,
    getAllBanners,
    createBanner,
}