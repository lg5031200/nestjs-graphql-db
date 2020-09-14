import gql from 'graphql-tag';

export const ME = gql`
  query me {
    me {
      id
      username
      email
    }
  }
`;

export const USER = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      username
      email
    }
  }
`;

export const PRODUCT = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      description
    }
  }
`;

export const PRODUCTS = gql`
  query products {
    products {
      id
      name
      description
    }
  }
`;