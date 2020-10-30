const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: { type : String, required:true},
    year: { type: Date},
    poster: { type: String}
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie