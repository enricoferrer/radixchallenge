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

type Equipment {
    equipmentId: String
    timestamp: String
    value: Float
}

input EquipmentInput {
    equipmentId: String
    timestamp: String
    value: Float
}

type Query {
    userLogin(email: String!, password: String!): User!
    getEmailDuplicate(email:String): Boolean
    getUser(amount: Int): [User]
    equipment(equipmentId: String): [Equipment!]
}

type Mutation {
    createUser(userInput: UserInput): User!
    deleteUser(ID: ID!): Boolean
    editUser(email: String!, editUserInput: EditUserInput): Boolean
    createEquipment(input: [EquipmentInput]!): [Equipment]!
}
`

export default typeDefs