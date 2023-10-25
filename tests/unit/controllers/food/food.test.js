const {
  createFood,
  getFoodDetailById,
  getOnlyFoodCount,
  getAllFood,
  updateFood,
  deleteFood,
} = require('@/controllers/food');
const FoodModel = require('@/models/FoodModel');
const httpMocks = require('node-mocks-http');
const foodMock = require('@root/tests/mock/food/food.json');
const countMock = require('@root/tests/mock/food/count.json');
const filterMock = require('@root/tests/mock/food/filter.json');

FoodModel.create = jest.fn().mockImplementation(() => Promise.resolve(foodMock));
FoodModel.findById = jest.fn().mockImplementation(() => Promise.resolve(foodMock));
FoodModel.count = jest.fn().mockImplementation(() => Promise.resolve(countMock));
const limit = jest.fn().mockImplementation(() => Promise.resolve([foodMock, foodMock]));
FoodModel.find = jest.fn().mockImplementation(() => ({ limit }));
foodMock.toObject = jest.fn(() => foodMock);
FoodModel.findByIdAndUpdate = jest.fn().mockImplementation(() => Promise.resolve());
FoodModel.findByIdAndDelete = jest.fn().mockImplementation(() => Promise.resolve());

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

afterEach(() => {
  // test if the response is sent
  expect(res._isEndCalled()).toBeTruthy();
});
describe('createFood Controller Test', () => {
  beforeEach(async () => {
    req.body = foodMock;
    res.location = jest.fn().mockImplementation(() => res);
    await createFood(req, res, next);
  });
  it('should call FoodModel.create', () => {
    expect(FoodModel.create).toBeCalledWith(foodMock);
  });
  it('should return 201 response code', () => {
    expect(res.statusCode).toBe(201);
  });
  it('should set location with a string in response', () => {
    expect(res.location).toBeCalledWith(expect.any(String));
  });
  it('should return json body success', () => {
    expect(res._getData()).toMatchResponse({});
  });
});

describe('getFoodDetailById Controller Test', () => {
  beforeEach(async () => {
    req.params = { id: foodMock._id };
    await getFoodDetailById(req, res, next);
  });
  it('should call FoodModel.findById', () => {
    expect(FoodModel.findById).toBeCalledWith(foodMock._id);
  });
});

describe('getOnlyFoodCount Controller Test', () => {
  beforeEach(async () => {
    req.query = { type: foodMock.type };
    await getOnlyFoodCount(req, res, next);
  });
  it('should call FoodModel.count', () => {
    expect(FoodModel.count).toBeCalledWith(expect.objectContaining({ type: foodMock.type }));
  });
  it('should return 200 response code', () => {
    expect(res.statusCode).toBe(200);
  });
  it('should return json body success with count', () => {
    expect(res._getData()).toStrictEqual({ message: 'ok', status: 's', count: countMock });
  });
});

describe('getAllFood Controller Test', () => {
  beforeEach(async () => {
    req.query = filterMock;
    await getAllFood(req, res, next);
  });
  it('should call FoodModel.find', () => {
    expect(FoodModel.find).toBeCalledWith(expect.objectContaining(filterMock));
  });
  it('should call limit()', () => {
    expect(limit).toBeCalledWith(Number(filterMock.limit));
  });
  it('should return 200 response code', () => {
    expect(res.statusCode).toBe(200);
  });
  it('should return json foods', () => {
    expect(res._getData()).toStrictEqual([foodMock, foodMock]);
  });
});

describe('updateFood Controller Test', () => {
  beforeEach(async () => {
    req.body = foodMock;
    req.params = { id: foodMock._id };
    await updateFood(req, res, next);
  });
  it('should call FoodModel.findByIdAndUpdate', () => {
    expect(FoodModel.findByIdAndUpdate).toBeCalledWith(foodMock._id, expect.objectContaining({ $set: req.body }));
  });
  it('should return 204 response code', () => {
    expect(res.statusCode).toBe(204);
  });
  it('should return empty body', () => {
    expect(res._getData()).toBe('');
  });
});

describe('deleteFood Controller Test', () => {
  beforeEach(async () => {
    req.params = { id: foodMock._id };
    await deleteFood(req, res, next);
  });
  it('should call FoodModel.findByIdAndDelete', () => {
    expect(FoodModel.findByIdAndDelete).toBeCalledWith(foodMock._id);
  });
  it('should return 204 response code', () => {
    expect(res.statusCode).toBe(204);
  });
  it('should return empty body', () => {
    expect(res._getData()).toBe('');
  });
});
