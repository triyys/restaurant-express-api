const request = require('supertest');
const app = require('@root/app');
const postgres = require('@/services/postgres');
const mongodb = require('@/services/mongodb');
const ErrorHandler = require('@/common/ErrorHandler');
const foodMock = require('../../mock/food/food.int.json');
const foodDetailMock = require('../../mock/food/foodDetail.int.json');
const authMock = require('../../mock/auth.int.json');

beforeAll(async () => {
    await mongodb.connect();
    await postgres.connect();
    await ErrorHandler.loadErrorDictionary();
});

describe('[GET] /foods/:id', () => {
    const endpoint = `/api/v1/foods/${foodMock._id}`;
    it('GET ' + endpoint, async () => {
        const response = await request(app).get(endpoint).expect(200);
        expect(response.body).toStrictEqual(foodMock);
    });
});

describe('[GET] /foods/:id/detail', () => {
    const endpoint = `/api/v1/foods/${foodDetailMock._id}/detail`;
    it('GET ' + endpoint, async () => {
        const response = await request(app).get(endpoint).expect(200);
        expect(response.body).toStrictEqual(foodDetailMock);
    });
});

describe('[GET] /foods/count', () => {
    const endpoint = `/api/v1/foods/count?type=Combo`;
    it('GET ' + endpoint, async () => {
        const response = await request(app)
            .get(endpoint)
            .expect(200);
        expect(response.body).toStrictEqual({ count: 12, message: 'ok', status: 's' });
    });
});

describe('[POST] /foods', () => {
    const endpoint = `/api/v1/foods`;
    it('POST ' + endpoint, async () => {
        const response = await request(app)
            .post(endpoint)
            .set('Authorization', `Bearer ${authMock.token}`)
            .send({})
            .expect(400);
        expect(response.text).toBe('name is missing');
    });
    it('POST ' + endpoint, async () => {
        await request(app)
            .post(endpoint)
            .send({})
            .expect(401);
    });
});
