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