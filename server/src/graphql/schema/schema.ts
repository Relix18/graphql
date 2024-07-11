export const schema = `#graphql
type User {
    name: String!
    _id: ID!
    email: String!
    password: String
}

type AuthPayload {
    token: String!
    user: User!
}

type Todo {
    _id: ID!
    title: String!
    description: String!
    user: User!
}

type Query {
    users: [User]
    user(id: ID!): User
    getTodos(id: ID!): [Todo]
    deleteTodo(id: ID!): String
    currentUser: User
}

type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    logIn(email: String!, password: String!): AuthPayload!
    createTodo(title: String!, description: String!, user: ID!): Todo
}
`;
