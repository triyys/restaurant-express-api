const BannerModel = require('../models/BannerModel');

const getBanner = function(req, res, next) {
    BannerModel.findById("6194a67d1a3858f6f08fa3e7")
        .then(banner => res.send(banner))
        .catch(next);
}

module.exports = {
    getBanner
}