export const getUser = `#graphql
query Query {
  currentUser {
    name
    _id
    email
  }
}`;

export const loginUser = `#graphql
mutation Mutation($email: String!, $password: String!) {
  logIn(email: $email, password: $password) {
    token
    user {
      email
      _id
      name
    }
  }
}
`;

export const signupUser = `#graphql
mutation Mutation($name: String!, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password) {
    token
    user {
      email
      name
      _id
    }
}}`;
