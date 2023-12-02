const express = require('express');
const bodyParser = require('body-parser');
const initWebRoutes = require('../routes/web');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const request = require('supertest');
const exp = require('constants');
require('dotenv').config();

let app = express();


//config app 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())


initWebRoutes(app);

describe('Testing auth', () => {
    test("register user fail", async () => {
        let data = {
            "email": "test11@gmail.com",
            "username": "test11",
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

    // test("register user success", async () => {
    //     let data = {
    //         "email": "trung19@gmail.com",
    //         "username": "trung19",
    //         "password": "123456"
    //     }

    //     const response = await request(app)
    //         .post('/v1/auth/register')
    //         .send(data)
    //         .set('Accept', 'application/json')

    //     expect(response.header['content-type']).toMatch('application/json');
    //     expect(response.statusCode).toBe(201);
    //     expect(response.body).toHaveProperty('message', 'User created successfully.');
    // })

    test("get all dishes", async () => {
        const response = await request(app)
            .get('/v1/dish')
            .set('Accept', 'application/json')

        expect(response.header['content-type']).toMatch('application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Get all dishes successfully');
    })
});