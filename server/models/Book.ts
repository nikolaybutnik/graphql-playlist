const mongoose = require('mongoose')
const Schema = mongoose.Schema
// The export is to handle a Typescript error:
// Cannot redeclare block-scoped variable 'mongoose'
export {}

// No need to create id prop because MongoDB will auto create id.
const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
