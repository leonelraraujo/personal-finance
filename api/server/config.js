'use strict';

const Path = require('path');
const SailsDisk = require('sails-disk');
const Postgres = require('sails-postgresql');

module.exports = {

    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 3001
    },

    main: {
        connection: process.env.NODE_ENV === 'dev' ? 'dev' : 'dev'
    },

    dogwater: {
        connections: {
            diskDb: {
                adapter: 'disk'
            },
            dev: {
                adapter: "postgres",
                host: "localhost",
                user: "postgres",
                password: "localpw",
                database: "personal_finance"
            }
        },
        adapters: {
            disk: SailsDisk,
            postgres: Postgres
        }
    },

    poop: {
        logPath: Path.normalize(`${__dirname}/../poop.log`)
    }

};
