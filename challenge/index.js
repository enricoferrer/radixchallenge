import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

const MONGODB = "mongodb+srv://root:12345@cluster0.z27vq.mongodb.net/";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
  console.log("MongoDB successful connection");
  return server.listen({ port: 5000 });
}).then((res) =>{
    console.log(`Server is running at ${res.url}`)
})
