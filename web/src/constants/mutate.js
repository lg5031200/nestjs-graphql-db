import gql from 'graphql-tag';

export const ADD_PRODUCT = gql`
  mutation addProduct($newProductData: CreateProductInput!) {
    addProduct(newProductData: $newProductData) {
      id
      name
      description
    }
  }
`;

export const LOGIN = gql`
  mutation login($loginData: LoginInput!) {
    login(loginData: $loginData) {
      id
      token
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;