const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
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
        newNote(content: String!): Note!
    }
`;

const resolvers = {
    Query: {
        hello: () => 'welcome here',
        notes: () => notes,
        note: (parent, args) => notes.find(note => note.id === args.id)
    },

    Mutation: {
        newNote: (parent, args) => {
            let noteValue = {
                id: String(notes.length + 1),
                content: args.content,
                author: 'Jequex'
            };
            notes.push(noteValue);
            return notes;
        }
    }
};

let notes = [
    { id: '1', content: 'This is a note', author: 'Adam Scott' },
    { id: '2', content: 'This is another note', author: 'Harlow Everly' },
    { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];


const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api' });

// app.get('/', (req, res) => {
//     res.status(200).json({ "msg": "welcome" })
// });




app.listen({ port }, () => {
    console.log(`server started on port: ${port} ${server.graphqlPath}`);
});