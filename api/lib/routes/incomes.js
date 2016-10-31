'use strict';

const Joi = require('joi');
const incomesSchema =  require('../models/incomes');

module.exports = [
    {
        method: 'get',
        path: '/incomes',
        config: {
            tags: ['api'],
            description: 'List all incomes',
            handler: (request, reply) => {
                const Incomes = request.collections().incomes;
                reply(Incomes.find());
            }
        }
    },
    {
        method: 'get',
        path: '/incomes/{incomeUuid}',
        config: {
            tags: ['api'],
            description: 'Information of a single income',
            validate: {
                params: {
                    incomeUuid : Joi.string().required().description('uuid of the income entry')
                }
            },
            handler: (request, reply) => {
                const Incomes = request.collections().incomes;
                reply(Incomes.findOne(request.params.incomeUuid));
            }
        }
    },
    {
        method: 'post',
        path: '/incomes',
        config: {
            tags: ['api'],
            description: 'Create new income',
            validate: {
                payload: {
                    category: Joi.string().valid(incomesSchema.attributes.category.enum).required().description('category of the income'),
                    description: Joi.string().min(3).max(50).required().description('description of the income'),
                    date: Joi.date().description('date of the income transaction'),
                    value: Joi.number().min(0).required().description('income value'),
                    user: Joi.number().required().description('id of the user with the income')
                }
            },
            handler: (request, reply) => {
                const Incomes = request.collections().incomes;
                reply(Incomes.create({
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
        path: '/incomes/{incomeUuid}',
        config: {
            tags: ['api'],
            description: 'Update income information',
            validate: {
                params: {
                    incomeUuid : Joi.string().guid({ version: ['uuidv4'] }).required().description('uuid of the income')
                },
                payload: {
                    category: Joi.string().valid(incomesSchema.attributes.category.enum).required().description('category of the income'),
                    description: Joi.string().min(3).max(50).required().description('description of the income'),
                    date: Joi.date().description('date of the income transaction'),
                    value: Joi.number().min(0).required().description('income value'),
                    user: Joi.number().required().description('id of the user with the income')
                }
            },
            handler: (request, reply) => {
                const Incomes = request.collections().incomes;
                reply(Incomes.update(request.params.incomeUuid,
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