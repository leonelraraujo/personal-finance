'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');
const LabbableServer = require('../server');

// Test shortcuts

const lab = exports.lab = Lab.script();
const before = lab.before;
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('Personal Finance', () => {

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

    it('initializes.', (done) => {
        expect(server).to.exist();

        // isInitialized() can be used to check the server's init state
        expect(LabbableServer.isInitialized()).to.equal(true);

        // Incomes.run(server);
        done();
    });

    it('dogwater plugin registered.', (done) => {

        expect(server.registrations.dogwater).to.exist();
        done();
    });
});
