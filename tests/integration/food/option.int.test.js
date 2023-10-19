const request = require('supertest');
const app = require('@root/app');
const postgres = require('@/services/postgres');
const mongodb = require('@/services/mongodb');
const ErrorHandler = require('@/common/ErrorHandler');
const optionMock = require('../../mock/food/option.int.json');

beforeAll(async () => {
    await mongodb.connect();
    await postgres.connect();
    await ErrorHandler.loadErrorDictionary();
});

describe('[GET] /foods/options', () => {
    const endpoint = `/api/v1/foods/options`;
    let response;
    beforeEach(async () => {
        response = await request(app).get(endpoint);
    });
    it('GET ' + endpoint, () => {
        expect(response.statusCode).toBe(200);
    });
    it('GET ' + endpoint, () => {
        expect(response.body.length).toBe(4);
    });
});

describe('[GET] /foods/options/:id', () => {
    const endpoint = `/api/v1/foods/options/${optionMock._id}`;
    let response;
    beforeEach(async () => {
        response = await request(app).get(endpoint);
    });
    it('GET ' + endpoint, () => {
        expect(response.statusCode).toBe(200);
    });
    it('GET ' + endpoint, () => {
        expect(response.body).toStrictEqual(optionMock);
    });
});
