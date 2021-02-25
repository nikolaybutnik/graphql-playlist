import React from 'react'
import { useQuery } from '@apollo/client'
import { getBooksQuery } from '../queries/queries'

interface bookObject {
  name: string
  genre: string
  id: string
}

const BookList = () => {
  const data = useQuery(getBooksQuery)
  // console.log(data)
  const displayBooks = () => {
    // Check if data from the request is still loading and render a placeholder.
    if (data.loading) {
      return <div>Loading books</div>
    } else {
      return data.data.books.map((book: bookObject) => {
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
