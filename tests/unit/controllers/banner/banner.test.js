const { createBanner } = require('@/controllers/banner');
const BannerModel = require('@/models/BannerModel');
const httpMocks = require('node-mocks-http');
const banner = require('@root/tests/mock/banner.json');

BannerModel.create = jest.fn().mockImplementation(() => Promise.resolve(banner));

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe('Banner Controller Test', () => {
    beforeEach(() => {
        req.body = banner;
    });
    afterEach(() => {
        // test if the response is sent
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should call BannerModel.create', async () => {
        await createBanner(req, res, next);
        expect(BannerModel.create).toBeCalledWith(banner);
    });
    it('should return 201 response code', async () => {
        await createBanner(req, res, next);
        expect(res.statusCode).toBe(201);
    });
    it('should return json body in response', async () => {
        BannerModel.create.mockResolvedValue(banner);
        res.location = jest.fn().mockImplementation(() => res);
        await createBanner(req, res, next);
        expect(res.location).toBeCalledWith(expect.any(String));
        expect(res._getData()).toStrictEqual({ message: 'ok', status: 's' });
    });
});
