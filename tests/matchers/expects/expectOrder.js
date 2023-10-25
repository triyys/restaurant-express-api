const expectOrder = (order) => expect.objectContaining({
    customerInfo: order?.customerInfo || expect.objectContaining({
        name: expect.any(String),
        phone: expect.any(String),
        address: expect.any(String),
        district: expect.any(String),
        ward: expect.any(String),
        typeOrder: expect.any(String),
    }),
    shipFee: order?.shipFee || expect.any(Number),
    status: order?.status || expect.any(String),
    items: order?.items || expect.arrayContaining([expect.objectContaining({
        options: expect.any(String),
        name: expect.any(String),
        imageUrl: expect.any(String),
        price: expect.any(Number),
        quantity: expect.any(Number),
    })]),
});

exports.expectOrder = expectOrder;
