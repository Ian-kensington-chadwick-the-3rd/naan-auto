const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const seedDataBase = require('../server/seeders/password')
const db = require('./config/connection');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3001;
const app = express();
require('dotenv').config();


const getUserFromToken = (token) => {
    try {
        if(token === null){
             throw new Error('token is null')
        }
        const jwtSecretKey = process.env.JWT_SECRET_KEY
        const verifiedToken = jwt.verify(token.slice(7), jwtSecretKey) 
        return verifiedToken
    } catch (e) {
        console.error("invalid token",e.message)
        return null;
        
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server,{ 
        context: async ({ req }) => { 
             console.log(req.headers.authorization)
            const token = req?.headers?.authorization || ""
            const user = getUserFromToken(token);
            return { user };
        }
    }))
  

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        })
    }

    db.once('open', () => {
        seedDataBase();

        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}`)
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)

        })
    })
};

startApolloServer();