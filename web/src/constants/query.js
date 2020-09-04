import gql from 'graphql-tag';

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