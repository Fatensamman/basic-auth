'use strict';
require('dotenv').config();
const base64 = require('base-64');

const { app, start } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');

const request = supergoose(app);

// heading of my test
describe('server', () => {
    //  place where we do the test 
    it('handle invalid routes', async () => {
        const response = await request.get('/hhhh');
        expect(response.status).toEqual(404);
    });

    it('handle server errors', async () => {
        const response = await request.get('/bad');
        expect(response.status).toEqual(500);
    });
    it('handle invalid method', async () => {
        const response = await request.put('/bad');
        expect(response.status).toEqual(404);
    });
});

describe('sign Up test ', () => {
    it(' it should create a new user on POST /signup', async () => {
        const response = await request.post('/signup').send({
            username: 'faten',
            password: '14789'
        })
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual('faten');
    });


    it(' it should login an existing user  using basic auth on POST /signin', async () => {
        const response1 = await request.post('/signup').send({
            username: 'faten',
            password: '14789'
        })
        const string = 'faten:14789';
        const user = base64.encode(string);
        let response = await request.post('/signin')
          .set(`Authorization`, `Basic ${user}`);
        console.log(response.body)

        expect(response.body.username).toEqual('faten');
        expect(response.status).toEqual(200);
    });
});

