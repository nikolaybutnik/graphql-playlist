import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { getBooksQuery } from '../queries/queries'

// Components
import BookDetails from './BookDetails'

interface bookObject {
  name: string
  genre: string
  id: string
}

const BookList: React.FC = () => {
  const data = useQuery(getBooksQuery)

  const [selectedBook, setSelectedBook] = useState('')

  const displayBooks = () => {
    // Check if data from the request is still loading and render a placeholder.
    if (data.loading) {
      return <div>Loading books</div>
    } else {
      return data.data.books.map((book: bookObject) => {
        return (
          <li key={book.id} onClick={(event) => setSelectedBook(book.id)}>
            {book.name}
          </li>
        )
      })
    }
  }
  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails
      // bookId={selectedBook}
      />
    </div>
  )
}

export default BookList
