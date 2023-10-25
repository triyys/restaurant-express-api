const request = require('supertest');
const app = require('@root/app');
const postgres = require('@/services/postgres');
const mongodb = require('@/services/mongodb');
const ErrorHandler = require('@/common/ErrorHandler');
const authMock = require('../../mock/auth.int.json');
const BannerModel = require('@/models/BannerModel');

beforeAll(async () => {
    await mongodb.connect();
    await postgres.connect();
    await ErrorHandler.loadErrorDictionary();
});

describe('[GET] /banners', () => {
    const endpoint = `/api/v1/banners`;
    it('GET ' + endpoint, async () => {
        const response = await request(app).get(endpoint).expect(200);
        expect(response.body).toMatchBanner([]);
    });
});

describe('[GET] /banners/:id', () => {
    const endpoint = `/api/v1/banners/6295cbad858cfee60cd82d11`;
    it('GET ' + endpoint, async () => {
        const response = await request(app).get(endpoint).expect(200);
        expect(response.body).toMatchBanner({});
    });
});

describe('[POST] /banners', () => {
    const endpoint = `/api/v1/banners`;
    it('POST ' + endpoint, async () => {
        const response = await request(app)
            .post(endpoint)
            .set('Authorization', `Bearer ${authMock.token}`)
            .send({ imageUrls: [] })
            .expect(201);
        const locationHeader = response.get('Location');
        expect(locationHeader).toStrictEqual(expect.stringContaining(`${endpoint}/`));
        expect(response.body).toMatchResponse({});
        
        const id = locationHeader.substring(locationHeader.lastIndexOf('/') + 1);
        await BannerModel.findByIdAndDelete(id);
    });
    it('POST ' + endpoint, async () => {
        await request(app)
            .post(endpoint)
            .send({ imageUrls: [] })
            .expect(401);
    });
});
