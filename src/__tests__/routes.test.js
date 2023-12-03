const express = require('express');
const bodyParser = require('body-parser');
const initWebRoutes = require('../routes/web');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const request = require('supertest');
const { describe } = require('yargs');
const { test } = require('node:test');
// const exp = require('constants');
require('dotenv').config();

let app = express();


//config app 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())


initWebRoutes(app);

// Register 
describe('POST /v1/auth/register', () => {
    test("should register user successly", async () => {
        let data = {
            "email": "test12345@gmail.com",
            "username": "test12345",
            "password": "123456"
        }

        const response = await request(app)
            .post('/v1/auth/register')
            .send(data)
            .set('Accept', 'application/json')

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Please provide all required fields.');
    });

    test("should register user fail when email has been used", async () => {
        let data = {
            "email": "trungpd@gmail.com",
            "username": "trungpd",
            "password": "123456"
        }

        const response = await request(app)
            .post('/v1/auth/register')
            .send(data)
            .set('Accept', 'application/json')

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(409);
        expect(response.body).toHaveProperty('message', 'User already exist.');
    })

    test("should register failed when missing password", async () => {
        let data = {
            "email": "duong12456@gmail.com",
            "username": "duong12456",
            "password": ""
        }

        const response = await request(app)
            .post('/v1/auth/register')
            .send(data)
            .set('Accept', 'application/json')

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Please provide all required fields.');
    })

});


// Login
describe('POST /v1/auth/login', () => {
    test("should login user successly", async () => {
        let data = {
            "email": "trungpd@gmail.com",
            "password": "123456"
        }

        const response = await request(app)
            .post('/v1/auth/login')
            .send(data)
            .set('Accept', 'application/json')

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(200);
    });

    test("should login user fail", async () => {
        let data = {
            "email": "trungpd@gmail.com",
            "password": "000"
        }

        const response = await request(app)
            .post('/v1/auth/login')
            .send(data)
            .set('Accept', 'application/json')

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Wrong email or password');
    })

    test("should login failed when password is not correct", async () => {
        let data = {
            "email": "trungpd@gmail.com",
            "password": ""
        }

        const response = await request(app)
            .post('/v1/auth/login')
            .send(data)
            .set('Accept', 'application/json')

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Email and password are required');
    })
})


// Get current user's information
describe('GET /v1/user/me/info', () => {
    test("should get user's info", async () => {
        let data = {
            "email": "trungpd@gmail.com",
            "password": "123456"
        }

        // make the login request
        const loginRes = await request(app)
            .post('/v1/auth/login')
            .send(data)
            .set('Accept', 'application/json')

        // set the token
        const TOKEN = loginRes.body.accessToken;

        const response = await request(app)
            .get('/v1/user/me/info')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${TOKEN}`)
        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'User found');
    })

    test('should return 401 if no token provided', async () => {
        const response = await request(app)
            .get('/v1/user/me/info')
            .set('Accept', 'application/json')

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(401);
        expect(response.body).toBe("\"You're not authenticated\"");
    })
});

// Get all dish
describe('GET /v1/dish', () => {
    test("should get all dishes", async () => {
        const response = await request(app)
            .get('/v1/dish')
            .set('Accept', 'application/json')

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Get all dishes successfully');
    })
})


// Get all dishes in cart
describe('GET /bill/cart', () => {
    test("should get all dishes in cart", async () => {
        let data = {
            "email": "trungpd@gmail.com",
            "password": "123456"
        }

        // make the login request
        const loginRes = await request(app)
            .post('/v1/auth/login')
            .send(data)
            .set('Accept', 'application/json')

        // set the token
        const TOKEN = loginRes.body.accessToken;

        const response = await request(app)
            .get('/v1/bill/cart')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${TOKEN}`);

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Get all dishes in cart successfully');
    });

    test('should return 401 if no token provided', async () => {
        const response = await request(app)
            .get('/v1/bill/cart')
            .set('Accept', 'application/json')

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(401);
        expect(response.body).toBe("\"You're not authenticated\"");
    })
})

// Add a dish to cart
describe('POST /bill/dish/add', () => {
    test('should return 401 if no token provided', async () => {
        const response = await request(app)
            .post('/v1/bill/dish/add')
            .send({
                "dishId": 1
            })
            .set('Accept', 'application/json')

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(401);
        expect(response.body).toBe("\"You're not authenticated\"");
    })

    test('should return 400 if no dishId provided', async () => {
        let data = {
            "email": "trungpd@gmail.com",
            "password": "123456"
        }

        // make the login request
        const loginRes = await request(app)
            .post('/v1/auth/login')
            .send(data)
            .set('Accept', 'application/json')

        // set the token
        const TOKEN = loginRes.body.accessToken;

        const response = await request(app)
            .post('/v1/bill/dish/add')
            .send({
                // "dishId": ""
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${TOKEN}`)

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'DishId is required');
    });

    test("should add dish to cart", async () => {
        let data = {
            "email": "trungpd@gmail.com",
            "password": "123456"
        }

        // make the login request
        const loginRes = await request(app)
            .post('/v1/auth/login')
            .send(data)
            .set('Accept', 'application/json')

        const TOKEN = loginRes.body.accessToken;

        const response = await request(app)
            .post('/v1/bill/dish/add')
            .send({
                "dishId": "1"
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${TOKEN}`)

        if (response.statusCode == 500) {
            console.log('error');
            console.log(response.body)
            throw new Error(response.body.message);
        }

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Add dish to cart successfully');
    })
});


// Get all table
describe('GET /v1/table/all', () => {
    test("should get all tables", async () => {
        let data = {
            "email": "trungpd@gmail.com",
            "password": "123456"
        }

        // make the login request
        const loginRes = await request(app)
            .post('/v1/auth/login')
            .send(data)
            .set('Accept', 'application/json')

        // set the token
        const TOKEN = loginRes.body.accessToken;

        const response = await request(app)
            .get('/v1/table/all')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${TOKEN}`)
        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Get all tables successfully');
    })

    test('should return 401 if no token provided', async () => {
        const response = await request(app)
            .get('/v1/table/all')
            .set('Accept', 'application/json')

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(401);
        expect(response.body).toBe("\"You're not authenticated\"");
    })
})

// Get booked table of user
describe('GET /v1/table/user', () => {
    test("should get user's table", async () => {
        let data = {
            "email": "trungpd@gmail.com",
            "password": "123456"
        }

        // make the login request
        const loginRes = await request(app)
            .post('/v1/auth/login')
            .send(data)
            .set('Accept', 'application/json')

        // set the token
        const TOKEN = loginRes.body.accessToken;

        const response = await request(app)
            .get('/v1/table/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${TOKEN}`)
        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Get booked table of user successfully');
    })

    test('should return 401 if no token provided', async () => {
        const response = await request(app)
            .get('/v1/table/user')
            .set('Accept', 'application/json')

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(401);
        expect(response.body).toBe("\"You're not authenticated\"");
    })
});


// Get all discounts of user
describe('POST /v1/discount/user', () => {
    test("should get user's discount", async () => {
        let data = {
            "email": "trungpd@gmail.com",
            "password": "123456"
        };

        // make the login request
        const loginRes = await request(app)
            .post('/v1/auth/login')
            .send(data)
            .set('Accept', 'application/json')

        // set the token
        const TOKEN = loginRes.body.accessToken;

        const response = await request(app)
            .post('/v1/discount/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${TOKEN}`)
        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Get all user discounts successfully');
    })

    test('should return 401 if no token provided', async () => {
        const response = await request(app)
            .post('/v1/discount/user')
            .set('Accept', 'application/json')

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(401);
        expect(response.body).toBe("\"You're not authenticated\"");
    })
});