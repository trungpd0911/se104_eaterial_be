const express = require('express');
const bodyParser = require('body-parser');
const initWebRoutes = require('../routes/web');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const request = require('supertest');
// const exp = require('constants');
require('dotenv').config();

let app = express();


//config app 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())


initWebRoutes(app);


// describe('Testing auth', () => {
//     test("register user fail", async () => {
//         let data = {
//             "email": "test11@gmail.com",
//             "username": "test11",
//             "password": "123456"
//         }

//         const response = await request(app)
//             .post('/v1/auth/register')
//             .send(data)
//             .set('Accept', 'application/json')

//         expect(response.header['content-type']).toMatch('application/json');
//         expect(response.statusCode).toBe(409);
//         expect(response.body).toHaveProperty('message', 'User already exist.');
//     })

//     test("get all dishes", async () => {
//         const response = await request(app)
//             .get('/v1/dish')
//             .set('Accept', 'application/json')

//         expect(response.header['content-type']).toMatch('application/json');
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('message', 'Get all dishes successfully');
//     })

//     test("login user success", async () => {
//         let data = {
//             "email": "myadmin@gmail.com",
//             "password": "123456"
//         }
        
//         const response = await request(app)
//             .post('/v1/auth/login')
//             .send(data)
//             .set('Accept', 'application/json') 

//         expect(response.header['content-type']).toMatch('application/json');
//         expect(response.statusCode).toBe(200);
//     });
// });


// describe('GET /bill/cart', () => {
//     test("should get all dishes in cart", async () => {
//         let data = {
//             "email" : "thanhduongphan@gmail.com",
//             "password" : "123456"
//         }

//         // make the login request
//         const loginRes = await request(app)
//             .post('/v1/auth/login')
//             .send(data)
//             .set('Accept', 'application/json')

//         // set the token
//         const TOKEN = loginRes.body.accessToken;

//         const response = await request(app)
//             .get('/v1/bill/cart')
//             .set('Accept', 'application/json')
//             .set('Authorization', `Bearer ${TOKEN}`);

//         if(response.statusCode == 500){
//             console.log('error');
//             console.log(response.body.name)
//             throw new Error(response.body.name);
//         }
//         console.log(response.body);

//         expect(response.header['content-type']).toMatch('application/json');
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('message', 'Get all dishes in cart successfully');
//     });

//     test('should return 401 if no token provided', async () => {
//         const response = await request(app)
//             .get('/v1/bill/cart')
//             .set('Accept', 'application/json')

//         expect(response.header['content-type']).toMatch('application/json');
//         expect(response.statusCode).toBe(401);
//         expect(response.text).toBe("\"You're not authenticated\"");
//     })
// })

describe('POST /bill/dish/add', () => {
    // test('should return 401 if no token provided', async () => {
    //     const response = await request(app)
    //         .post('/v1/bill/dish/add')
    //         .send({
    //             "dishId": 1
    //         })
    //         .set('Accept', 'application/json')

    //     expect(response.header['content-type']).toMatch('application/json');
    //     expect(response.statusCode).toBe(401);
    //     expect(response.text).toBe("\"You're not authenticated\"");
    // })

    // test('should return 400 if no dishId provided', async () => {
    //     let data = {
    //         "email": "thanhduongphan@gmail.com",
    //         "password": "123456"
    //     }

    //     // make the login request
    //     const loginRes = await request(app)
    //         .post('/v1/auth/login')
    //         .send(data)
    //         .set('Accept', 'application/json')

    //     // set the token
    //     const TOKEN = loginRes.body.accessToken;

    //     const response = await request(app)
    //         .post('/v1/bill/dish/add')
    //         .send({
    //             // "dishId": ""
    //         })
    //         .set('Accept', 'application/json')
    //         .set('Authorization', `Bearer ${TOKEN}`)

    //     expect(response.header['content-type']).toMatch('application/json');
    //     expect(response.statusCode).toBe(400);
    //     expect(response.body).toHaveProperty('message', 'DishId is required');
    // });

    test("should add dish to cart", async () => {
        let data = {
            "email": "thanhduongphan@gmail.com",
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
                "dishId": "2"
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${TOKEN}`)
        
        if(response.statusCode == 500){
            console.log('error');
            console.log(response.body)
            throw new Error(response.body.message);
        }

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Add dish to cart successfully');
    })
});

// // testing table routes
// describe('GET /v1/table/all', () => {
//     test("should get all tables", async () => {
//         let data = {
//             "email": "thanhduongphan@gmail.com",
//             "password": "123456"
//         }

//         // make the login request
//         const loginRes = await request(app)
//             .post('/v1/auth/login')
//             .send(data)
//             .set('Accept', 'application/json')

//         // set the token
//         const TOKEN = loginRes.body.accessToken;

//         const response = await request(app)
//             .get('/v1/table/all')
//             .set('Accept', 'application/json')
//             .set('Authorization', `Bearer ${TOKEN}`)
//         expect(response.header['content-type']).toMatch('application/json');
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('message', 'Get all tables successfully');
//     })

//     test('should return 401 if no token provided', async () => {
//         const response = await request(app)
//             .get('/v1/table/all')
//             .set('Accept', 'application/json')

//         expect(response.header['content-type']).toMatch('application/json');
//         expect(response.statusCode).toBe(401);
//         expect(response.text).toBe("\"You're not authenticated\"");
//     })

// })


// // testing table routes
// describe('GET /v1/table/all', () => {
//     test("should get all tables", async () => {
//         let data = {
//             "email": "thanhduongphan@gmail.com",
//             "password": "123456"
//         }

//         // make the login request
//         const loginRes = await request(app)
//             .post('/v1/auth/login')
//             .send(data)
//             .set('Accept', 'application/json')

//         // set the token
//         const TOKEN = loginRes.body.accessToken;

//         const response = await request(app)
//             .get('/v1/table/all')
//             .set('Accept', 'application/json')
//             .set('Authorization', `Bearer ${TOKEN}`)
//         expect(response.header['content-type']).toMatch('application/json');
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('message', 'Get all tables successfully');
//     })

//     test('should return 401 if no token provided', async () => {
//         const response = await request(app)
//             .get('/v1/table/all')
//             .set('Accept', 'application/json')

//         expect(response.header['content-type']).toMatch('application/json');
//         expect(response.statusCode).toBe(401);
//         expect(response.text).toBe("\"You're not authenticated\"");
//     })
// })

// describe('GET /v1/table/user', () => {
//     test("should get user's table", async () => {
//         let data = {
//             "email": "thanhduongphan@gmail.com",
//             "password": "123456"
//         }
        
//         // make the login request
//         const loginRes = await request(app)
//             .post('/v1/auth/login')
//             .send(data)
//             .set('Accept', 'application/json')

//         // set the token
//         const TOKEN = loginRes.body.accessToken;

//         const response = await request(app)
//             .get('/v1/table/user')
//             .set('Accept', 'application/json')
//             .set('Authorization', `Bearer ${TOKEN}`)
//         expect(response.header['content-type']).toMatch('application/json');
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('message', 'Get user table successfully');
//     })

//     test('should return 401 if no token provided', async () => {
//         const response = await request(app)
//             .get('/v1/table/user')
//             .set('Accept', 'application/json')

//         expect(response.header['content-type']).toMatch('application/json');
//         expect(response.statusCode).toBe(401);
//         expect(response.text).toBe("\"You're not authenticated\"");
//     })
// });