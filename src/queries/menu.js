import gql from 'graphql-tag'

export const GET_MENU = gql`
  {
    menu(id: "TWVudTo0Nw") {
      id
      name
      menuItems(first: 10) {
        edges {
          node {
            id
            label
            childItems {
              nodes {
                label
                id
              }
            }
          }
        }
      }
    }
  }
`
