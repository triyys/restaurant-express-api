const request = require('supertest');
const app = require('@root/app');
const postgres = require('@/services/postgres');
const mongodb = require('@/services/mongodb');
const ErrorHandler = require('@/common/ErrorHandler');
const authMock = require('../../../mock/auth.int.json');
const orderMock = require('../../../mock/order/order.int.json');

beforeAll(async () => {
    await mongodb.connect();
    await postgres.connect();
    await ErrorHandler.loadErrorDictionary();
});

describe('[GET] /orders', () => {
    const endpoint = `/api/v1/orders`;
    it('GET ' + endpoint, async () => {
        const response = await request(app)
            .get(endpoint)
            .set('Authorization', `Bearer ${authMock.token}`)
            .expect(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
    it('GET ' + endpoint, async () => {
        await request(app).get(endpoint).expect(401);
    });
});

describe('[GET] /orders/:id', () => {
    const endpoint = `/api/v1/orders/${orderMock._id}`;
    it('GET ' + endpoint, async () => {
        const response = await request(app)
            .get(endpoint)
            .set('Authorization', `Bearer ${authMock.token}`)
            .expect(200);
        expect(response.body).toStrictEqual(orderMock);
    });
    it('GET ' + endpoint, async () => {
        await request(app).get(endpoint).expect(401);
    });
});
