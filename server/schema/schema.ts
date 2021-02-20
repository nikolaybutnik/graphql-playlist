const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

// This defines the first object type.
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
})

// This defines how we initially enter the graph.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent: string, args: string) {
        // Code to get data from db/other source.
      },
    },
  },
})

// In the export we define which query we're allowing the user to make
// when they make queries from the frontend.
module.exports = new GraphQLSchema({
  query: RootQuery,
})
