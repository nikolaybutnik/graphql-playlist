import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { getAuthorsQuery, addBookMutation } from '../queries/queries'

// Create interface for type checking of author object
interface authorObject {
  name: string
  age: number
  id: string
}

const AddBook = () => {
  const [form, setForm] = useState({ name: '', genre: '', authorId: '' })

  const authorData = useQuery(getAuthorsQuery)

  const [addBook, { data }] = useMutation(addBookMutation)

  // Check if data from the request is still loading and render a placeholder.
  const displayAuthors = () => {
    // Check if data from the request is still loading and render a placeholder.
    if (authorData.loading) {
      return <option>Loading authors</option>
    } else {
      return authorData.data.authors.map((author: authorObject) => {
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
    if (form.name !== '' && form.genre !== '' && form.authorId !== '') {
      addBook({
        variables: {
          name: form.name,
          genre: form.genre,
          authorId: form.authorId,
        },
      })
    } else {
      console.error('All form fields need to be filled out.')
    }
  }

  return (
    <form onSubmit={(event) => handleFormSubmit(event)}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          value={form.genre}
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
