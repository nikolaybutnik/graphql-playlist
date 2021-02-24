import React from 'react'
import { gql, useQuery } from '@apollo/client'

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

const AddBook = () => {
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
        </select>
      </div>

      <button>+</button>
    </form>
  )
}

export default AddBook
