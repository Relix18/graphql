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

export const getTodos = `#graphql
query Query {
  getTodos {
    title
    description
    _id
  }
}`;

export const addTodo = `#graphql
mutation Mutation($title: String!, $description: String!) {
  createTodo(title: $title, description: $description) {
    _id
    title
    description
  }
}
`;

export const deleteTodo = `#graphql
mutation Mutation($deleteTodoId: ID!) {
  deleteTodo(id: $deleteTodoId){
    message
    id
  }
}`;

export const signOut = `#graphql
mutation Mutation {
  signOut
}`;
