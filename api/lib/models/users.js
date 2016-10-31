'use strict';

module.exports = {
    identity: 'users',
    columnName: 'users',
    connection:'dev',
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
        },
        incomes: {
            collection: 'incomes',
            via: 'user'
        }
    }
};