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
            release: response.data.Released,
            poster: response.data.Poster,
            runtime: response.data.Runtime,
            genre: response.data.Genre,
            director: response.data.Director,
            plot: response.data.Plot,
            production: response.data.Production
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
            movies: allMovies,
            currentUser: req.session.currentUser
        })
    })
})
// NEW MOVIE
router.get('/new', (req, res)=>{
    res.render('moviechat/new.ejs', {
        currentUser: req.session.currentUser
    })
})
// CREATE MOVIE
router.post('/', (req, res) =>{
    Movie.create(req.body, (err, madeMovie)=>{
        res.redirect('/')
    })
})

// CREATE POST
router.post('/:id', (req, res)=>{
    req.body.movie = req.params.id,
    req.body.author = req.session.currentUser.username,
    req.body.picture = req.session.currentUser.icon,
    Post.create(req.body, (err, madePost)=>{
        if (err){
            console.log(err)
        } else {
        res.redirect('back')}
    })
})

// EDIT MOVIE
router.get('/:id/edit', (req, res)=>{
    Movie.findById(req.params.id, (err, foundMovie)=>{
        res.render('moviechat/edit.ejs', {
            movie:foundMovie,
            currentUser: req.session.currentUser
        })
    })
})
// UPDATE MOVIE
router.put('/:id', (req, res)=>{
    Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel)=>{
        res.redirect('/')
    })
})

// SHOW MOVIE & POSTS
router.get('/:id', (req, res)=>{
    Movie.findById(req.params.id, (err, foundMovie)=>{
        Post.find({movie: foundMovie.id}, (err, foundPosts)=>{
            res.render('moviechat/show.ejs', {
                movie: foundMovie,
                posts: foundPosts,
                currentUser: req.session.currentUser
            })
        })
    })
})


// DELETE MOVIE & POSTS
router.delete('/:id', (req, res)=>{
    Movie.findByIdAndDelete(req.params.id, { useFindAndModify: false }, (err, foundMovie)=>{
        Post.deleteMany({movie: req.params.id}, (err, foundPosts)=>{
            res.redirect('/')
        })
    })
})

// DELETE COMMENT
router.delete('/post/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id, { useFindAndModify: false }, (err, foundMovie)=>{
        res.redirect('back')
    })
})

module.exports = router;