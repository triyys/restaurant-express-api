const request = require('supertest');
const app = require('@root/app');
const postgres = require('@/services/postgres');
const mongodb = require('@/services/mongodb');
const ErrorHandler = require('@/common/ErrorHandler');
const foodMock = require('../../mock/food/food.int.json');
const foodDetailMock = require('../../mock/food/foodDetail.int.json');

beforeAll(async () => {
    await mongodb.connect();
    await postgres.connect();
    await ErrorHandler.loadErrorDictionary();
});

describe('[GET] /foods/:id', () => {
    const endpoint = `/api/v1/foods/${foodMock._id}`;
    let response;
    beforeEach(async () => {
        response = await request(app).get(endpoint);
    });
    it('GET ' + endpoint, () => {
        expect(response.statusCode).toBe(200);
    });
    it('GET ' + endpoint, () => {
        expect(response.body).toStrictEqual(foodMock);
    });
});

describe('[GET] /foods/:id/detail', () => {
    const endpoint = `/api/v1/foods/${foodDetailMock._id}/detail`;
    let response;
    beforeEach(async () => {
        response = await request(app).get(endpoint);
    });
    it('GET ' + endpoint, () => {
        expect(response.statusCode).toBe(200);
    });
    it('GET ' + endpoint, () => {
        expect(response.body).toStrictEqual(foodDetailMock);
    });
});

describe('[GET] /foods/count', () => {
    const endpoint = `/api/v1/foods/count?type=Combo`;
    let response;
    beforeEach(async () => {
        response = await request(app).get(endpoint);
    });
    it('GET ' + endpoint, () => {
        expect(response.statusCode).toBe(200);
    });
    it('GET ' + endpoint, () => {
        expect(response.body).toStrictEqual({ count: 12, message: 'ok', status: 's' });
    });
});

describe('[GET] /foods', () => {
    const endpoint = `/api/v1/foods?type=Combo&limit=${3}`;
    let response;
    beforeEach(async () => {
        response = await request(app).get(endpoint);
    });
    it('GET ' + endpoint, () => {
        expect(response.statusCode).toBe(200);
    });
    it('GET ' + endpoint, () => {
        expect(response.body.length).toBe(3);
    });
});
