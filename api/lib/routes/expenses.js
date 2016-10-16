'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'get',
        path: '/expenses',
        config: {
            tags: ['api'],
            description: 'List all expenses',
            handler: (request, reply) => {
                const Expenses = request.collections().expenses;
                reply(Expenses.find());
            }
        }
    },
    {
        method: 'get',
        path: '/expenses/{expenseUuid}',
        config: {
            tags: ['api'],
            description: 'Information of a single expense',
            validate: {
                params: {
                    expenseUuid : Joi.string().required().description('id of the expense entry'),
                }
            },
            handler: (request, reply) => {
                const Expenses = request.collections().expenses;
                reply(Expenses.findOne(request.params.expenseUuid));
            }
        }
    },
    {
        method: 'post',
        path: '/expenses',
        config: {
            tags: ['api'],
            description: 'Create new expense',
            validate: {
                payload: {
                    title: Joi.string().min(3).max(50).required().description('title of the expense'),
                    description: Joi.string().min(3).max(50).required().description('description of the expense'),
                    user: Joi.number().required().description('id of the user with the expense')
                }
            },
            handler: (request, reply) => {
                const Expenses = request.collections().expenses;
                reply(Expenses.create({
                    title: request.payload.title,
                    description: request.payload.description,
                    user: request.payload.user
                }));
            }
        }
    },
];