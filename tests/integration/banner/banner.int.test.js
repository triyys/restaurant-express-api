const request = require('supertest');
const app = require('@root/app');
const postgres = require('@/services/postgres');
const mongodb = require('@/services/mongodb');
const ErrorHandler = require('@/common/ErrorHandler');
const bannerMock = require('../../mock/banner.int.json');

beforeAll(async () => {
    await mongodb.connect();
    await postgres.connect();
    await ErrorHandler.loadErrorDictionary();
});

describe('[GET] /banners', () => {
    const endpoint = `/api/v1/banners`;
    let response;
    beforeEach(async () => {
        response = await request(app).get(endpoint);
    });
    it('GET ' + endpoint, () => {
        expect(response.statusCode).toBe(200);
    });
    it('GET ' + endpoint, () => {
        expect(response.body.length).toBe(2);
    });
});

describe('[GET] /banners/:id', () => {
    const endpoint = `/api/v1/banners/${bannerMock._id}`;
    let response;
    beforeEach(async () => {
        response = await request(app).get(endpoint);
    });
    it('GET ' + endpoint, () => {
        expect(response.statusCode).toBe(200);
    });
    it('GET ' + endpoint, () => {
        expect(response.body).toStrictEqual(bannerMock);
    });
});
