const BannerModel = require('../models/BannerModel')
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
            const result = {
                status: true,
                message: `Banner ${banner._id} is created`,
            }
            console.log(result)
            return res.status(200).send(result)
        })
        .catch(next)
}

module.exports = {
    getBannerById,
    getAllBanners,
    createBanner,
}