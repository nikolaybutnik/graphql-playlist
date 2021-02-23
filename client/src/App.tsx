import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

// Components
import BookList from './components/BookList'

// Apollo Client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div id="main">
          <h1>Reading List</h1>
          <BookList />
        </div>
      </div>
    </ApolloProvider>
  )
}

export default App
