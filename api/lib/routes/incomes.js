/**
 * Created by leonel on 10/23/16.
 */
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
                    incomeUuid : Joi.string().required().description('uuid of the income entry'),
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
                    description: Joi.string().min(3).max(50).required().description('description of the expense'),
                    user: Joi.number().required().description('id of the user with the expense')
                }
            },
            handler: (request, reply) => {
                const Incomes = request.collections().incomes;
                reply(Incomes.create({
                    category: request.payload.category,
                    description: request.payload.description,
                    user: request.payload.user
                }));
            }
        }
    }
];