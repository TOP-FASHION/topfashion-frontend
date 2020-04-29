import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  {
    productCategories {
      nodes {
        name
        id
        slug
        count
        children {
          nodes {
            name
            id
            count
            slug
          }
        }
      }
    }
  }
`;
