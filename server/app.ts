const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const app = express()

// When a request to /graphql comes in, pass the operation to graphqlHTTP
app.use('/graphql', graphqlHTTP({

}))

app.listen(4000, () => {
    console.log('Listening on port 4000.')
})