const request = require('supertest');
const server = require('../src/app.js');


beforeAll(async () => {
    // do something before anything else runs
    console.log('jest starting');
});

// close the server after each test
afterAll(async () => {
    server.close();
    console.log('server closed');
});

describe('root route tests', () => {
    test('get home route GET /', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('hello world');
    });
});

describe('posts route test', () => {
    test('get posts route GET /posts', async () => {
        const response = await request(server).get('/posts');
        expect(response.status).toEqual(200);
        expect(response.body && response.body.length === 100);
        // console.log(response.body.length);
    })
});
