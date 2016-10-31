'use strict';

const Joi = require('joi');
const expensesSchema =  require('../models/expenses');

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
                    expenseUuid : Joi.string().required().description('id of the expense entry')
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
                    category: Joi.string().valid(expensesSchema.attributes.category.enum).required().description('category of the expense'),
                    description: Joi.string().min(3).max(50).required().description('description of the expense'),
                    date: Joi.date().description('date of the expense transaction'),
                    value: Joi.number().min(0).required().description('income value'),
                    user: Joi.number().required().description('id of the user with the expense')
                }
            },
            handler: (request, reply) => {
                const Expenses = request.collections().expenses;
                reply(Expenses.create({
                    category: request.payload.category,
                    description: request.payload.description,
                    date: new Date(request.payload.date),
                    value: request.payload.value,
                    user: request.payload.user
                }));
            }
        }
    },
    {
        method: 'put',
        path: '/expenses/{expenseUuid}',
        config: {
            tags: ['api'],
            description: 'Update expense information',
            validate: {
                params: {
                    expenseUuid : Joi.string().guid({ version: ['uuidv4'] }).required().description('uuid of the expense')
                },
                payload: {
                    category: Joi.string().valid(expensesSchema.attributes.category.enum).required().description('category of the expense'),
                    description: Joi.string().min(3).max(50).required().description('description of the expense'),
                    date: Joi.date().description('date of the expense transaction'),
                    value: Joi.number().min(0).required().description('income value'),
                    user: Joi.number().required().description('id of the user with the expense')
                }
            },
            handler: (request, reply) => {
                const Expenses = request.collections().expenses;
                reply(Expenses.update(request.params.expenseUuid,
                    {
                        category: request.payload.category,
                        description: request.payload.description,
                        date: new Date(request.payload.date),
                        value: request.payload.value,
                        user: request.payload.user
                    }));
            }
        }
    }

];