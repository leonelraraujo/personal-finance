'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'get',
        path: '/users',
        config: {
            tags: ['api'],
            description: 'List all users',
            handler: (request, reply) => {
                const Users = request.collections().users;
                reply(Users.find());
            }
        }
    },
    {
        method: 'get',
        path: '/users/{userId}',
        config: {
            tags: ['api'],
            description: 'Information of a single user',
            validate: {
                params: {
                    userId : Joi.number().required().description('id of the user')
                }
            },
            handler: (request, reply) => {
                const Users = request.collections().users;
                reply(Users.findOne(request.params.userId).populate('expenses').populate('incomes'));
            }
        }
    },
    {
        method: 'post',
        path: '/users',
        config: {
            tags: ['api'],
            description: 'Create new user',
            validate: {
                payload: {
                    name: Joi.string().min(3).max(50).required().description('name of the new user'),
                    email: Joi.string().min(3).max(50).required().description('email of the new user')
                }
            },
            handler: (request, reply) => {
                const Users = request.collections().users;
                reply(Users.create({
                    name: request.payload.name,
                    email: request.payload.email
                }));
            }
        }
    }
];
