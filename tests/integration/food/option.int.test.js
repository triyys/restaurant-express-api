const request = require('supertest');
const app = require('@root/app');
const postgres = require('@/services/postgres');
const mongodb = require('@/services/mongodb');
const ErrorHandler = require('@/common/ErrorHandler');

beforeAll(async () => {
    await mongodb.connect();
    await postgres.connect();
    await ErrorHandler.loadErrorDictionary();
});

describe('[GET] /foods/options', () => {
    const endpoint = `/api/v1/foods/options`;
    it('GET ' + endpoint, async () => {
        const response = await request(app).get(endpoint).expect(200);
        expect(response.body).toMatchOption([]);
    });
});

describe('[GET] /foods/options/:id', () => {
    const endpoint = `/api/v1/foods/options/61925ba5835f61e2f1d80832`;
    it('GET ' + endpoint, async () => {
        const response = await request(app).get(endpoint).expect(200);
        expect(response.body).toMatchOption({});
    });
});
