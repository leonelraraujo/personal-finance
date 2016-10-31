'use strict';

const uuid = require('node-uuid');

module.exports = {
    identity: 'incomes',
    columnName: 'incomes',
    connection:'dev',
    attributes: {
        uuid: {
            type: 'string',
            primaryKey: true,
            defaultsTo: () => uuid.v4(),
            unique: true, // Should this be kept? test validation time with/without
            index: true,
            uuidv4: true // TODO: Read the docs to actually know what this does
        },
        category: {
            type: 'string',
            enum: ['wage', 'bonus', 'miscellaneous'],
            required: true
        },
        description: {
            type: 'string'
        },
        value: {
            type: 'float'
        },
        date: {
            type: 'datetime',
            defaultsTo: () => new Date()
        },
        user: {
            model: 'users',
            required: true
        }
    }
};