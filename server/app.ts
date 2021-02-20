const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

// When a request to /graphql comes in, pass the operation to graphqlHTTP
app.use(
  '/graphql',
  graphqlHTTP({
    schema, // or schema: schema
  })
)

app.listen(4000, () => {
  console.log('Listening on port 4000.')
})
