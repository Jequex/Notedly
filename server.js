const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const dbConnect = require('./config/db');
const {Note} = require('./models');
// require('dotenv').config();

const port = process.env.PORT || 7000;

const typeDefs = gql`
    type Note {
        id: ID!
        content: String!
        author: String!
    }

    type Query {
        hello: String
        notes: [Note!]!
        note(id:ID): Note!
    }

    type Mutation {
        newNote(content: String!): [ Note! ]
    }
`;

const resolvers = {
    Query: {
        hello: () => 'welcome here',
        notes: async () => await Note.find(),
        note: async (parent, args) => await Note.findById(args.id)
    },

    Mutation: {
        newNote: async (parent, args) => {
            let noteValue = {
                content: args.content,
                author: 'Jequex'
            };
            await Note.create(noteValue);
            return Note.find();
        }
    }
};


const app = express();

dbConnect();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api' });

// app.get('/', (req, res) => {
//     res.status(200).json({ "msg": "welcome" })
// });




app.listen({ port }, () => {
    console.log(`server started on port: ${port} ${server.graphqlPath}`);
});