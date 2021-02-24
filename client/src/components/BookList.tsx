import React from 'react'
import { gql, useQuery } from '@apollo/client'

const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`

const BookList = () => {
  const data = useQuery(getBooksQuery)
  // console.log(data)
  const displayBooks = () => {
    // Check if data from the request is still loading and render a placeholder.
    if (data.loading) {
      return <div>Loading books</div>
    } else {
      return data.data.books.map((book: any) => {
        return <li key={book.id}>{book.name}</li>
      })
    }
  }
  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
    </div>
  )
}

export default BookList
