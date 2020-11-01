const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type : String},
    year: { type: String},
    poster: { type: String}
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie