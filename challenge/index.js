import  express  from "express";
import { ApolloServer } from "apollo-server-express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";


const MONGODB = "mongodb+srv://root:12345@cluster0.z27vq.mongodb.net/";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";


const app = express();
app.use(bodyParser.json());


const server = new ApolloServer({ typeDefs, resolvers });


const startServer = async () => {
  await server.start(); // Aguarda a inicialização do servidor
  server.applyMiddleware({ app }); // Aplica o middleware

  const PORT = 9000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}${server.graphqlPath}`);
  });
};

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
    startServer(); // Inicia o servidor Express após a conexão
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

