
'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const before = lab.before;

const test = lab.test;
const suite = lab.suite;
const expect = Code.expect;

const LabbableServer = require('../../server');

describe('Expenses', () => {

    let server;

    before((done) => {

        LabbableServer.ready((err, srv) => {

            if (err) {
                return done(err);
            }

            server = srv;

            return done();
        });
    });

    suite('GET list of users', () => {
        test('expects 200', (done) => {

            const options = {
                method: 'GET',
                url: '/users'
            };

            server.inject(options, (response) => {
                const result = response.result;
                expect(response.statusCode).to.equal(200);
                expect(result).to.be.instanceof(Array);
                done();
            });
        });

    });

    suite('POST /users - create user', () => {
        test('expects 200', (done) => {

            const options = {
                method: 'POST',
                url: '/users',
                payload: {
                    name: 'TestName',
                    email: 'test@pf.com'
                }
            };

            server.inject(options, (response) => {
                const result = response.result;
                expect(response.statusCode).to.equal(200);
                expect(result).to.be.object();
                done();
            });
        });

    });

    suite('GET single users', () => {
        test('expects 200 - empty response', (done) => {

            const options = {
                method: 'GET',
                url: '/users/0'
            };

            server.inject(options, (response) => {
                const result = response.result;
                expect(response.statusCode).to.equal(200);
                expect(result).to.be.null();
                done();
            });
        });

        test('expects 200 - including a user', (done) => {

            const options = {
                method: 'GET',
                url: '/users/1'
            };

            server.inject(options, (response) => {
                const result = response.result;
                expect(response.statusCode).to.equal(200);
                expect(result.id).to.be(1);
                done();
            });
        });

    });
});
