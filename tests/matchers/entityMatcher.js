const { expectBanner } = require('./expects/expectBanner');
const { expectFood } = require('./expects/expectFood');
const { expectFoodDetail } = require('./expects/expectFoodDetail');
const { expectOption } = require('./expects/expectOption');
const { expectOrder } = require('./expects/expectOrder');

const entityMatcher = (expectObject) => function(received, expected) {
    // define Entity array with arrayContaining and re-use expectObject
    const expectArray = (entities) =>
        entities.length === 0
            ? // in case an empty array is passed
            expect.arrayContaining([expectObject()])
            : // in case an array of Entities is passed
            expect.arrayContaining(entities.map(expectObject));

    // expected can either be an array or an object
    const expectedResult = Array.isArray(expected)
        ? expectArray(expected)
        : expectObject(expected);

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
    toMatchFood: entityMatcher(expectFood),
    toMatchFoodDetail: entityMatcher(expectFoodDetail),
    toMatchBanner: entityMatcher(expectBanner),
    toMatchOption: entityMatcher(expectOption),
    toMatchOrder: entityMatcher(expectOrder),
});
