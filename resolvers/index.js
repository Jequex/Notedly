const Query = require('./query');
const Mutation = require('./mutations');
const { GraphQLDateTime } = require('graphql-iso-date');

const resolvers = {
    Query,
    Mutation,
    DateTime: GraphQLDateTime
};

module.exports = resolvers;
