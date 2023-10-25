const mongoModelClient = require('@/services/mongoModelClient');

const banner = {
  modelName: 'banners',
  attributes: {
    imageUrls: {
      type: '[string]',
    },
  },
  options: {
    timestamps: true,
  },
};

module.exports = mongoModelClient.createModel(banner);
