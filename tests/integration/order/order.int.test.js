const request = require('supertest');
const app = require('@root/app');
const postgres = require('@/services/postgres');
const mongodb = require('@/services/mongodb');
const ErrorHandler = require('@/common/ErrorHandler');
const authMock = require('../../mock/auth.int.json');
const OrderModel = require('@/models/OrderModel');

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
    response.body.forEach((order) => {
      expect(order).toMatchOrder({});
    });
  });
  it('GET ' + endpoint, async () => {
    await request(app).get(endpoint).expect(401);
  });
});

describe('[GET] /orders/:id', () => {
  const endpoint = `/api/v1/orders/632ecb9fc736b75ca8b521e1`;
  it('GET ' + endpoint, async () => {
    const response = await request(app)
      .get(endpoint)
      .set('Authorization', `Bearer ${authMock.token}`)
      .expect(200);
    expect(response.body).toMatchOrder({});
  });
  it('GET ' + endpoint, async () => {
    await request(app).get(endpoint).expect(401);
  });
});

describe('[POST] /orders', () => {
  const endpoint = `/api/v1/orders`;
  it('POST ' + endpoint, async () => {
    const response = await request(app)
      .post(endpoint)
      .send({ shipFee: 1000 })
      .expect(201);
    const locationHeader = response.get('Location');
    expect(locationHeader).toStrictEqual(expect.stringContaining(`${endpoint}/`));
    expect(response.body).toMatchResponse({});

    const id = locationHeader.substring(locationHeader.lastIndexOf('/') + 1);
    await OrderModel.findByIdAndDelete(id);
  });
});