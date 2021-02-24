import { gql } from '@apollo/client'

const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`
export { getBooksQuery, getAuthorsQuery }
