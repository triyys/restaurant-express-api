const request = require('supertest');
const app = require('@root/app');
const postgres = require('@/services/postgres');
const mongodb = require('@/services/mongodb');
const ErrorHandler = require('@/common/ErrorHandler');
const authMock = require('../../mock/auth.int.json');

beforeAll(async () => {
    await mongodb.connect();
    await postgres.connect();
    await ErrorHandler.loadErrorDictionary();
});

describe('[GET] /foods/:id', () => {
    const endpoint = `/api/v1/foods/6193cfcc3e278583b22570d0`;
    it('GET ' + endpoint, async () => {
        const response = await request(app).get(endpoint).expect(200);
        expect(response.body).toMatchFood({});
    });
});

describe('[GET] /foods/:id/detail', () => {
    const endpoint = `/api/v1/foods/6193cfcc3e278583b22570d0/detail`;
    it('GET ' + endpoint, async () => {
        const response = await request(app).get(endpoint).expect(200);
        expect(response.body).toMatchFoodDetail({});
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
