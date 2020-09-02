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
    beforeEach(async () => {
        const url = process.env.TEST_DB_CONN_URL;
        await mongoose.connect(url, { useNewUrlParser: true });
        await userModel.remove({ fname: 'John' });  
    })



    test("user/id route responds with 400 status code if there is no id", async done => {
        const res = await _s.get('/user/12345');

        expect(res.status).toBe(400);3
        expect(res.text).toBe("Session not found.");
        done();
    });

    test("user/create responds with 201 status", async done => {
        var newUser = {
			_id: mongoose.Types.ObjectId(),
			fname: 'John',
          	lname: 'Doe',
          	email: 'johnedoe@email.com',
          	passwordHash: 'bibigo90'
		};

        _s
            .post('/user/create/12345')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    test("user/create responds with 400 status if a user exists with same email", async done => {
        var newUser = {
			_id: mongoose.Types.ObjectId(),
			fname: 'John',
          	lname: 'Doe',
          	email: 'johndoe@email.com',
          	passwordHash: 'bibigo90',
		};

        _s
            .post('/user/create/12345')
            .send(newUser)
            .set('Accept', 'application/json')
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });;

        _s
            .post('/user/create/12345')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    test("user/login returns an object", async done => {
        const user = {
            email: 'jackiedoe@email.com',
            passwordHash: 'bibigo90'
        }
        
        _s.post('/user/login/')
            .send(user)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).toStrictEqual({fname: 'Jackie', lname: 'Doe', email: 'jackiedoe@email.com', _id: "5f4ff11e0ec7c1fe6bd0ebe2", roles: [], turnins: []})
                done();
            });;
    })
});