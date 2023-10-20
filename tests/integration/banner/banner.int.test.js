const request = require('supertest');
const app = require('@root/app');
const postgres = require('@/services/postgres');
const mongodb = require('@/services/mongodb');
const ErrorHandler = require('@/common/ErrorHandler');
const bannerMock = require('../../mock/banner.int.json');
const BannerModel = require('@/models/BannerModel');

beforeAll(async () => {
    await mongodb.connect();
    await postgres.connect();
    await ErrorHandler.loadErrorDictionary();
});

describe('[GET] /banners', () => {
    const endpoint = `/api/v1/banners`;
    it('GET ' + endpoint, async () => {
        const response = await request(app).get(endpoint);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe('[GET] /banners/:id', () => {
    const endpoint = `/api/v1/banners/${bannerMock._id}`;
    it('GET ' + endpoint, async () => {
        const response = await request(app).get(endpoint);
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(bannerMock);
    });
});

describe('[POST] /banners', () => {
    const endpoint = `/api/v1/banners`;
    it('POST ' + endpoint, async () => {
        const response = await request(app)
            .post(endpoint)
            .send({ imageUrls: [] });
        const locationHeader = response.get('Location');
        expect(locationHeader).toStrictEqual(expect.stringContaining(`${endpoint}/`));
        expect(response.statusCode).toBe(201);
        expect(response.body).toStrictEqual({ message: 'ok', status: 's' });
        
        const id = locationHeader.substring(locationHeader.lastIndexOf('/') + 1);
        await BannerModel.findByIdAndDelete(id);
    });
});
