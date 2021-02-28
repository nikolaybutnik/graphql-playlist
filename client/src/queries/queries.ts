import { gql } from '@apollo/client'

// Query for getting all books
const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`

// Query for getting all authors
const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

// Query for adding a new book
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`

// Query for getting a specific book
const getBookQuery = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`

export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery }
