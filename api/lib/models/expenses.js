'use strict';

var uuid = require("node-uuid");

module.exports = {
    identity: 'expenses',
    connection:'diskDb',
    attributes: {
        uuid: {
            type: 'string',
            primaryKey: true,
            defaultsTo: () => uuid.v4(),
            unique: true, // Should this be kept?
            index: true,
            uuidv4: true
        },
        title: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string'
        },
        user: {
            model: 'users',
            required: true
        }
    }
};