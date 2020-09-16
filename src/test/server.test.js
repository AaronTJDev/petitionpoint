const app = require('../../server');
const supertest = require('supertest');
const _s = supertest(app);
const userModel = require('../../models/User')
const mongoose = require('mongoose');

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

    afterAll(async () => {
        await mongoose.disconnect()
    })

    afterEach( async () => {
        await userModel.deleteOne({ email: 'jackiedoe@email.com' });
    });

    test("user/id route responds with 400 status code if there is no id", async done => {
        const res = await _s.get('/user/12345');

        expect(res.status).toBe(400);
        expect(res.text).toBe("Session not found.");
        done();
    });

    test("user/create responds with 201 status", async done => {
        let newUser = {
			_id: mongoose.Types.ObjectId(),
			fname: 'Jackie',
          	lname: 'Doe',
          	email: 'jackiedoe@email.com',
          	passwordHash: 'bibigo90',
		};

        _s
            .post('/user/create/12345')
            .send(newUser)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    test("user/create responds with 400 status if a user exists with same email", async done => {
        let newUser = {
			_id: mongoose.Types.ObjectId(),
			fname: 'Jackie',
          	lname: 'Doe',
          	email: 'jackiedoe@email.com',
          	passwordHash: 'bibigo90',
		};

        _s
            .post('/user/create/12345')
            .send(newUser)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });

        _s
            .post('/user/create/12345')
            .send(newUser)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    test("user/authenticate returns an object", async done => {
        // Add user to database
        let user = {
			_id: mongoose.Types.ObjectId(),
			fname: 'Jackie',
          	lname: 'Doe',
          	email: 'jackiedoe@email.com',
          	passwordHash: 'bibigo90',
		};

        _s
            .post('/user/create/1234')
            .send(user)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });

        _s.post('/user/authenticate')
            .send(user)
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
        // Add user to database
        let user = {
			_id: mongoose.Types.ObjectId(),
			fname: 'Jackie',
          	lname: 'Doe',
          	email: 'jackiedoe@email.com',
          	passwordHash: 'bibigo90',
        };

        _s
            .post('/user/create/12345')
            .send(user)
            .end(function(err, res) {
                if (err) return done(err);
            });

        // Update user
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

