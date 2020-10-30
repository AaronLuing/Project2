const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.js')

// INDEX
router.get('/', (req, res)=>{
    Movie.find({}, (err, allMovies)=>{
        res.render('moviechat/index.ejs', {
            movies: allMovies
        })
    })
})
// NEW
router.get('/new', (req, res)=>{
    res.render('moviechat/new.ejs')
})
// CREATE/POST
router.post('/', (req, res) =>{
    Movie.create(req.body, (err, madeMovie)=>{
        res.redirect('/')
    })
})
// EDIT
router.get('/:id/edit', (req, res)=>{
    Movie.findById(req.params.id, (err, foundMovie)=>{
        res.render('moviechat/edit.ejs', {
            movie:foundMovie,
        })
    })
})
// UPDATE
router.put('/:id', (req, res)=>{
    Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel)=>{
        res.redirect('/')
    })
})

// SHOW
router.get('/:id', (req, res)=>{
    Movie.findById(req.params.id, (err, foundMovie)=>{
        res.render('moviechat/show.ejs', {
            movie: foundMovie
        })
    })
})

// DELETE
router.delete('/:id', (req, res)=>{
    Movie.findByIdAndDelete(req.params.id, { useFindAndModify: false }, (err, data)=>{
        res.redirect('/')
    })
})


module.exports = router;