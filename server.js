const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dbConnect = require('./config/db');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');
const models = require('./models');
const { PORT, JWT_SECRET } = require('./config/data');
// require('dotenv').config();

const port = PORT || 7000;


const app = express();

dbConnect();

const getUser = token => {
    if (token) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
            throw new Error('Session Invalid');
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => { return { models }; }
});

server.applyMiddleware({ app, path: '/api' });

// app.get('/', (req, res) => {
//     res.status(200).json({ "msg": "welcome" })
// });




app.listen({ port }, () => {
    console.log(`server started on port: ${port} ${server.graphqlPath}`);
});