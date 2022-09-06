const BannerModel = require('../models/BannerModel')
const { success } = require('../responses')
const { getMongoDocById, getMongoCollection } = require('../utils')

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
                .send(success())
        })
        .catch(next)
}

module.exports = {
    getBannerById,
    getAllBanners,
    createBanner,
}