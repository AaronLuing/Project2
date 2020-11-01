const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const Movie = require('../models/movie.js')
require('dotenv').config()


// SEARCH
// router.get('/search', (req, res)=>{
//     // console.log(req.body)
//     t=req.query.title
//     axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDBAPIKEY}&t=${t}`)
//     .then(function (response) {
//         // handle success
//         console.log(response);
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })
//     .then(function () {
//         Movie.create(response.body)
//     });
//     res.redirect('/')
// })

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