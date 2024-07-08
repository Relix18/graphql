export const schema = `#graphql
type User{
    name:String!
    _id:ID!
    email:String!
    password: String
    role: String!
    verified:Boolean!
    
}

type AddressDetails{
        name: String!
        email: String!
        phone: Int!
        street: String!
        city: String!
        state: String!
        zip: Int!
}

type Addresses {
    user: User
    address: AddressDetails
}

type Query{
    users:[User]
    user(id:ID!): User
    addresses:[Addresses]
}
`;
