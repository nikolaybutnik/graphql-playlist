import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { getAuthorsQuery } from '../queries/queries'

// Create interface for type checking of author object
interface authorObject {
  name: string
  age: number
  id: string
}

const AddBook = () => {
  const [form, setForm] = useState({})

  const data = useQuery(getAuthorsQuery)
  // console.log(data)

  // Check if data from the request is still loading and render a placeholder.
  const displayAuthors = () => {
    // Check if data from the request is still loading and render a placeholder.
    if (data.loading) {
      return <option>Loading authors</option>
    } else {
      return data.data.authors.map((author: authorObject) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        )
      })
    }
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(event.type)
  }

  return (
    <form onSubmit={(event) => handleFormSubmit(event)}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(event) => setForm({ ...form, genre: event.target.value })}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select
          onChange={(event) =>
            setForm({ ...form, authorId: event.target.value })
          }
        >
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  )
}

export default AddBook
