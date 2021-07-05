const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dbConnect = require('./config/db');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');
// require('dotenv').config();

const port = process.env.PORT || 7000;


const app = express();

dbConnect();

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