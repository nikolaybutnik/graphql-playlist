const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/Book')
const Author = require('../models/Author')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql

// Dummy data for testing
// const books = [
//   { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//   { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//   { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//   { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
//   { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//   { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
// ]
// const authors = [
//   { name: 'Patrick Rothfuss', age: 44, id: '1' },
//   { name: 'Brandon Sanderson', age: 42, id: '2' },
//   { name: 'Terry Pratchett', age: 66, id: '3' },
// ]

// This defines the Book object type.
const BookType = new GraphQLObjectType({
  name: 'Book',
  // Without wrapping fields in a function, GraphQL will fail to fetch because we'll run into
  // the problem of calling on AuthorType or BookType before defining them. If we wrap fields in
  // a function, we're not executing the code right away, but waiting until all the code runs first.
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      // When we have nested data, we already have the parent data (the book object).
      resolve(parent: any, args: any) {
        // return _.find(authors, { id: parent.authorId })
      },
    },
  }),
})

// This defines the Author object type.
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent: any, args: any) {
        // Match the requested book's authorId property to the id property of the parents (Author).
        // Returns array of all matches.
        // return _.filter(books, { authorId: parent.id })
      },
    },
  }),
})

// Define how we initially enter the graph.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Query a single book
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      // GraphQLID type basically enables type coersion, so we can search by string or number
      // Args is the data passed to make the query.
      // Resolve function looks at data and returns what's needed.
      resolve(parent: any, args: any) {
        // Code to get data from db/other source.
        // return _.find(books, { id: args.id })
      },
    },
    // Query a single author
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent: string, args: any) {
        // return _.find(authors, { id: args.id })
      },
    },
    // Query all books
    books: {
      type: new GraphQLList(BookType),
      resolve(parent: any, args: any) {
        // return books
      },
    },
    // Query all authors
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent: any, args: any) {
        // return authors
      },
    },
  },
})

// Define how we interact with the data in database.
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Create a new author.
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: GraphQLString,
        },
        age: { type: GraphQLInt },
      },
      resolve(parent: any, args: any) {
        const author = new Author({
          name: args.name,
          age: args.age,
        })
        // We're returning the result of save() so we can get the data back.
        // Not necessary, only needed if we want to get data back after saving it.
        return author.save()
      },
    },
    // Create a new book.
    addBook: {
      type: BookType,
      args: {
        name: {
          type: GraphQLString,
        },
        genre: {
          type: GraphQLString,
        },
        authorId: {
          type: GraphQLID,
        },
      },
      resolve(parent: any, args: any) {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        })
        // We're returning the result of save() so we can get the data back.
        // Not necessary, only needed if we want to get data back after saving it.
        return book.save()
      },
    },
  },
})

// In the export we define which query we're allowing the user to make
// when they make queries from the frontend.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
