import gql from 'graphql-tag'

export const GET_POST = gql`
  query GetPost($id: ID) {
    post(id: $id) {
      id
      content
      owner
    }
  }
`

export const GET_PRODUCTS = gql`
  {
    products {
      nodes {
        id
        name
      }
    }
  }
`
