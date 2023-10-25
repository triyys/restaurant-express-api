const expectFoodDetail = (foodDetail) => expect.objectContaining({
    name: foodDetail?.name || expect.any(String),
    unitPrice: foodDetail?.unitPrice || expect.any(Number),
});

exports.expectFoodDetail = expectFoodDetail;
