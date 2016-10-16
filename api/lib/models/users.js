'use strict';

module.exports = {
    identity: 'users',
    connection:'diskDb',
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        expenses: {
            collection: 'expenses',
            via: 'user'
        }
    }
};