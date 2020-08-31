const app = require('../../server');
const supertest = require('supertest');
const { request } = require('../../server');
const { expectCt } = require('helmet');
const { deleteOne } = require('../../models/User');
const _s = supertest(app);



describe("server is running", () => {
    test("get home page", async done => {
        _s.get('/')
            .expect(200)
        done();
    });
});

describe("controllers behaves as expected", () => {
    test("user/id route sends 400 status code if there is no id", async done => {
        const res = await _s.get('/user/5343523');

        expect(res.status).toBe(400);
        expect(res.text).toBe("Session not found.");
        done();4
    });

});
