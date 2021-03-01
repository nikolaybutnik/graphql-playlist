import React from 'react'
import { useQuery } from '@apollo/client'
import { getBookQuery } from '../queries/queries'

interface Props {
  bookId: string
  children?: React.ReactNode | React.ReactNodeArray
}

interface BookItem {
  id: string
  name: string
}

const BookDetails = ({ bookId }: Props) => {
  const { data } = useQuery(getBookQuery, {
    variables: {
      id: bookId,
    },
  })

  const displayBookDetails = () => {
    if (data) {
      console.log(data)
      return (
        <div>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>Other books by {data.book.author.name}: </p>
          <ul className="other-books">
            {data.book.author.books.map((item: BookItem) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )
    } else {
      return <div>No book selected</div>
    }
  }

  return (
    <div id="book-details">
      <div>{displayBookDetails()}</div>
    </div>
  )
}

export default BookDetails
