const expectFood = (food) =>
  expect.objectContaining({
    name: food?.name || expect.any(String),
    price: food?.price || expect.any(Number),
    discount: food?.discount || expect.any(String),
    imageUrls: food?.imageUrls || expect.arrayContaining([expect.any(String)]),
    optionIds: food?.optionIds || expect.arrayContaining([expect.any(String)]),
    type: food?.type || expect.any(String),
    description: food?.description || expect.any(String),
  });

exports.expectFood = expectFood;
