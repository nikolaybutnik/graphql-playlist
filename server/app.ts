const express = require('express')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

// When a request to /graphql comes in, pass the operation to graphqlHTTP
app.use(
  '/graphql',
  graphqlHTTP({
    schema, // or schema: schema
    graphiql: true,
  })
)

// Connect MongoDB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/graphql-playlist',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
)

app.listen(4000, () => {
  console.log('Listening on port 4000.')
})
