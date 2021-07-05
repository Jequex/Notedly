const Query = require('./query');
const Mutations = require('./mutations');
const { GraphQLDateTime } = require('graphql-iso-date');

const resolvers = {
    Query,
    Mutations,
    DateTime: GraphQLDateTime
};

module.exports = resolvers;
