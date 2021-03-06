const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar DateTime

    type Note {
        id: ID!
        favoriteCount: Int!
        favoritedBy: [User!]
        content: String!
        author: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String!
        notes: [Note!]!
        favorites: [Note!]!
    }

    type Query {
        notes: [Note!]!
        note(id:ID): Note!
        user(username: String): User
        users: [User!]!
        me: User
    }

    type Mutation {
        newNote(content: String!) : [ Note! ]!
        deleteNote(id: ID!) : Boolean!
        updateNote(id: ID!, content: String!) : [ Note! ]!
        signUp(username: String!, email: String!, password: String!) : String!
        signIn(username: String!, email: String!, password: String!) : String!
        toggleFavorite(id: ID!): Note!
    }
`;

module.exports = typeDefs;