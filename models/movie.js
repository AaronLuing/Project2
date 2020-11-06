const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type : String},
    release: { type: String},
    poster: { type: String},
    runtime: {type: String},
    genre: {type: String},
    director: {type: String},
    plot: {type: String},
    production: {type: String}
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie