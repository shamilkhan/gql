import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from "apollo-server-express";

import { BooksResolver } from './resolvers/books';
import { AuthorResolver } from './resolvers/authors';

(async () => {
    const app = express();

    await createConnection();

    const schema = await buildSchema({
        resolvers: [BooksResolver, AuthorResolver]
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res })
    });

    apolloServer.applyMiddleware({ app, cors: false });

    const PORT = 3000;

    app.listen(PORT, () => console.log(`App is listening ${PORT}`));

})();
