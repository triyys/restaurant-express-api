const responseMatcher = function (received, expected) {
  const expectedResult = expect.objectContaining({
    status: expected?.status || expect.any(String),
    message: expected?.message || expect.any(String),
  });

  // equality check for received entity and expected entity
  const pass = this.equals(received, expectedResult);

  if (pass) {
    return {
      message: () =>
        `Expected: ${this.utils.printExpected(expectedResult)}\nReceived: ${this.utils.printReceived(received)}`,
      pass: true,
    };
  }
  return {
    message: () =>
      `Expected: ${this.utils.printExpected(expectedResult)}\nReceived: ${this.utils.printReceived(
        received,
      )}\n\n${this.utils.diff(expectedResult, received)}`,
    pass: false,
  };
};

expect.extend({
  toMatchResponse: responseMatcher,
});
