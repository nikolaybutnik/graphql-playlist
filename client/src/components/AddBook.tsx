import React from 'react'
import { useQuery } from '@apollo/client'
import { getAuthorsQuery } from '../queries/queries'

const AddBook = () => {
  const data = useQuery(getAuthorsQuery)
  console.log(data)
  // Check if data from the request is still loading and render a placeholder.
  const displayAuthors = () => {
    // Check if data from the request is still loading and render a placeholder.
    if (data.loading) {
      return <option>Loading authors</option>
    } else {
      return data.data.authors.map((author: any) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        )
      })
    }
  }
  return (
    <form>
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  )
}

export default AddBook
