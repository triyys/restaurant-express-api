const expectOption = (option) => expect.objectContaining({
    name: option?.name || expect.any(String),
    isMultiSelect: option?.isMultiSelect || expect.any(Boolean),
    items: option?.items || expect.any(Array),
});

exports.expectOption = expectOption;
