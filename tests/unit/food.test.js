const { createFood } = require('@/controllers/food');
const FoodModel = require('@/models/FoodModel');
const httpMocks = require('node-mocks-http');
const food = require('../mock/food.json');

FoodModel.create = jest.fn().mockImplementation(() => Promise.resolve(food));

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe('Demo Test', () => {
    beforeEach(() => {
        req.body = food;
    });
    afterEach(() => {
        // test if the response is sent
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should call FoodModel.create', async () => {
        await createFood(req, res, next);
        expect(FoodModel.create).toBeCalledWith(food);
    });
    it('should return 201 response code', async () => {
        await createFood(req, res, next);
        expect(res.statusCode).toBe(201);
    });
    it('should return json body in response', async () => {
        FoodModel.create.mockResolvedValue(food);
        res.location = jest.fn().mockImplementation(() => res);
        await createFood(req, res, next);
        expect(res.location).toBeCalledWith(expect.any(String));
        expect(res._getData()).toStrictEqual({ message: 'ok', status: 's' });
    });
});
