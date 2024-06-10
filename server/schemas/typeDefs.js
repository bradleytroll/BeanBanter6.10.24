const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    coffeeShops: [CoffeeShop]
    comments: [Comment]
  }

  type CoffeeShop {
    _id: ID
    name: String
    location: String
    rating: Int
    review: String
    user: User
    comments: [Comment]
  }

  type Comment {
    _id: ID
    content: String
    user: User
    coffeeShop: CoffeeShop
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    coffeeShops: [CoffeeShop]
    comments(coffeeShopId: ID!): [Comment]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth
    addCoffeeShop(name: String!, location: String!, rating: Int!, review: String!): CoffeeShop
    updateCoffeeShop(id: ID!, name: String, location: String, rating: Int, review: String): CoffeeShop
    deleteCoffeeShop(id: ID!): CoffeeShop
    addComment(coffeeShopId: ID!, content: String!): Comment
    updateComment(commentId: ID!, content: String!): Comment
    deleteComment(commentId: ID!): Comment
  }
`;

module.exports = typeDefs;
