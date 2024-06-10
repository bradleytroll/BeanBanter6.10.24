import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        username
        _id
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        email
        username
        _id
      }
    }
  }
`;

export const ADD_COFFEE_SHOP = gql`
  mutation addCoffeeShop($name: String!, $location: String!, $rating: Int!, $review: String!) {
    addCoffeeShop(name: $name, location: $location, rating: $rating, review: $review) {
      _id
      name
      location
      rating
      review
      user {
        username
      }
    }
  }
`;

export const UPDATE_COFFEE_SHOP = gql`
  mutation updateCoffeeShop($id: ID!, $name: String, $location: String, $rating: Int, $review: String) {
    updateCoffeeShop(id: $id, name: $name, location: $location, rating: $rating, review: $review) {
      _id
      name
      location
      rating
      review
    }
  }
`;

export const DELETE_COFFEE_SHOP = gql`
  mutation deleteCoffeeShop($id: ID!) {
    deleteCoffeeShop(id: $id) {
      _id
      name
    }
  }
`;


export const ADD_COMMENT = gql`
  mutation addComment($coffeeShopId: ID!, $content: String!) {
    addComment(coffeeShopId: $coffeeShopId, content: $content) {
      _id
      content
      user {
        username
      }
      createdAt
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($commentId: ID!, $content: String!) {
    updateComment(commentId: $commentId, content: $content) {
      _id
      content
      user {
        username
      }
      createdAt
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      _id
    }
  }
`;
