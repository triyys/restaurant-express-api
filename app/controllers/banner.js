const BannerModel = require('../models/BannerModel')

// [GET] /banners/:id
const getBannerById = (req, res, next) => {
    BannerModel.findById(req.params.id)
        .then((banner) => {
            return res.status(200).send(banner)
        })
        .catch(next)
}

// [GET] /banners
const getAllBanners = (req, res, next) => {
    BannerModel.find()
        .then((banners) => {
            return res.status(200).send(banners)
        })
        .catch(next)
}

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