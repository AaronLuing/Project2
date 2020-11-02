const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id: {type: String},
    subject: { type : String},
    body: { type: String},
    tag: {type: String}
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post