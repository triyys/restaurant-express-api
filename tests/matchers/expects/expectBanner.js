const expectBanner = (banner) => expect.objectContaining({
    imageUrls: banner?.imageUrls || expect.arrayContaining([expect.any(String)]),
});

exports.expectBanner = expectBanner;
