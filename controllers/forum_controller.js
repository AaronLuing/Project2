const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const Movie = require('../models/movie.js')
const Post = require('../models/forum.js')
require('dotenv').config()


// SEARCH
router.get('/search', (req, res)=>{
    console.log(req)
    // t=req.query.title
    axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDBAPIKEY}&t=${req.query.title}`)
    .then(function (response) {
        // handle success
        console.log(response.data);
        Movie.create({
            title: response.data.Title,
            year: response.data.Year,
            poster: response.data.Poster
        })
        res.redirect('/')
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function (response) {
    });
})

// INDEX
router.get('/', (req, res)=>{
    Movie.find({}, (err, allMovies)=>{
        res.render('moviechat/index.ejs', {
            movies: allMovies
        })
    })
})
// NEW MOVIE
router.get('/new', (req, res)=>{
    res.render('moviechat/new.ejs')
})
// CREATE MOVIE
router.post('/', (req, res) =>{
    Movie.create(req.body, (err, madeMovie)=>{
        res.redirect('/')
    })
})

// CREATE POST
router.post('/:id', (req, res)=>{
    req.body.movie = req.params.id
    Post.create(req.body, (err, madePost)=>{
        if (err){
            console.log(err)
        } else {
        res.redirect('back')}
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
        Post.find({movie: foundMovie.id}, (err, foundPosts)=>{
            res.render('moviechat/show.ejs', {
                movie: foundMovie,
                posts: foundPosts
            })
        })
    })
})


// DELETE
router.delete('/:id', (req, res)=>{
    Movie.findByIdAndDelete(req.params.id, { useFindAndModify: false }, (err, foundMovie)=>{
        Post.deleteMany({movie: req.params.id}, (err, foundPosts)=>{
            res.redirect('/')
        })
    })
})


module.exports = router;