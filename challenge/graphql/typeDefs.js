import { gql } from "apollo-server";

const typeDefs = gql`
type User {
    name: String!
    email: String!
    password: String!
    createdAt: String!
}

input UserInput {
    name: String
    email: String
    password: String
}

input EditUserInput {
    password: String
}

type Query {
    user(ID: ID!): User!
    getUser(amount: Int): [User]
}

type Mutation {
    createUser(userInput: UserInput): User!
    deleteUser(ID: ID!): Boolean
    editUser(email: String!, editUserInput: EditUserInput): Boolean
}
`

export default typeDefs