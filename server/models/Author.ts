const mongoose = require('mongoose')
const Schema = mongoose.Schema
// The export is to handle a Typescript error:
// Cannot redeclare block-scoped variable 'mongoose'
export {}

// No need to create id prop because MongoDB will auto create id.
const authorSchema = new Schema({
  name: String,
  age: Number,
})

const Author = mongoose.model('Author', authorSchema)

module.exports = Author
