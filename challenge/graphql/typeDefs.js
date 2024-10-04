import { gql } from "apollo-server";

const typeDefs = gql`

type User {
    name: String!
    email: String!
    password: String!
    createdAt: String!
}

type AuthPayload {
    user: User!
}

input UserInput {
    name: String
    email: String
    password: String
}

input EditUserInput {
    password: String
}

type Equipment {
    equipmentId: String!
    timestamp: String!
    value: Float!
}

input EquipmentInput {
    equipmentId: String
    timestamp: String
    value: Float
}

type Query {
    userLogin(email: String!, password: String!): AuthPayload!
    getEmailDuplicate(email:String): Boolean
    getUser(amount: Int): [User]
    equipment(equipmentId: String): [Equipment!]
    getEquipment(amout: Int): [Equipment]
}

type Mutation {
    createUser(userInput: UserInput): User!
    deleteUser(ID: ID!): Boolean
    editUser(email: String!, editUserInput: EditUserInput): Boolean
}
`

export default typeDefs