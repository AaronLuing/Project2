const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    subject: { type : String},
    body: { type: String}
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post