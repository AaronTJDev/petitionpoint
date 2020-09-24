const app = require('../../server');
const supertest = require('supertest');
const _s = supertest(app);

const mongoose = require('mongoose');
const userModel = require('../../models/User')
const _ = require('lodash')

const testUser = {
    _id: mongoose.Types.ObjectId(),
    fname: 'Jackie',
    lname: 'Doe',
    email: 'jackiedoe@email.com',
    passwordHash: 'bibigo90',
};

describe("server is running", () => {
    test("get home page", async done => {
        _s.get('/')
            .expect(200)
        done();
    });
});

describe("user controller behaves as expected", () => {
    beforeAll(async () => {
        const url = process.env.TEST_DB_CONN_URL;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    });

    beforeEach(async () => {
        addTestUserToDb();
    });

    afterAll(async () => {
        await mongoose.disconnect()
    })

    afterEach( async () => {
        removeTestUserFromDb();
    });

    test("user/id route responds with 400 status code if there is no id", async done => {
        const res = await _s.get('/user/12345');

        expect(res.status).toBe(400);
        expect(res.text).toBe("Session not found.");
        done();
    });

    test.skip("user/create responds with 201 status", async done => {
        _s
            .post('/user/create/12345')
            .send(testUser)
            .end(function(err, res) {
                if (err) return done(err, res);
                expect(res).toBe(201);
                done();
            });
    });

    test("user/create responds with 400 status if a user exists with same email", async done => {
        _s
            .post('/user/create/12345')
            .send(testUser)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    test("user/authenticate returns an object", async done => {
        _s.post('/user/authenticate')
            .send(testUser)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    expect(err).toBe(null)
                    return done(err);
                } 

                expect(res.body).toMatchObject({fname: 'Jackie', lname: 'Doe', email: 'jackiedoe@email.com'})
                done();
            });
    });

    test("user/edit returns 200", async done => {
        var user = _.cloneDeep(testUser);
        user.fname = "Sarah"
        user.lname = "Doeson"

        _s
            .put(`/user/edit/${user._id}`)
            .send(user)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});

async function addTestUserToDb(){
    let user = new userModel(testUser);
    await userModel.create(user);
}

async function removeTestUserFromDb(){
    await userModel.remove({ email: 'jackiedoe@email.com' });
}