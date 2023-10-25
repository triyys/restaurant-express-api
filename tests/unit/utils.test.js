const { getMongoDocById, getMongoCollection, useError } = require('@/utils');
const httpMocks = require('node-mocks-http');

const findById = jest.fn().mockImplementation(() => Promise.resolve());
const find = jest.fn().mockImplementation(() => Promise.resolve());

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('Utils Test', () => {
  it('should test getMongoDocById', async () => {
    const requestHandler = getMongoDocById({ findById });
    const id = 'random';
    req.params = { id };
    await requestHandler(req, res, next);
    expect(requestHandler).toStrictEqual(expect.any(Function));
    expect(findById).toBeCalledWith(id);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should test getMongoCollection', async () => {
    const requestHandler = getMongoCollection({ find });
    await requestHandler(req, res, next);
    expect(requestHandler).toStrictEqual(expect.any(Function));
    expect(find).toBeCalled();
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should test useError', () => {
    const requestHandler = useError();
    expect(requestHandler).toStrictEqual(expect.any(Function));
  });
});
