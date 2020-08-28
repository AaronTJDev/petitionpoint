const app = require('../../server');
const supertest = require('supertest');
const { request } = require('../../server');
const { expectCt } = require('helmet');
const { deleteOne } = require('../../models/User');
const _s = supertest(app);



describe("server is running", () => {
    test("get home page", async done => {
        const res = await _s.get('/');

        expect(res.status).toBe(200);
        done();
    });
});

describe("endpoints are working", () => {

});
