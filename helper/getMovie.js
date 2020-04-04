const axios = require('axios')

const getMovieByTitle = (title) => {
    return axios.get(`http://www.omdbapi.com/?apikey=${process.env.apikey}&s=${title}`)
        .then(result => {
            let dataMovie = result.data.Search[0]
            console.log(`ini dataMovie`, dataMovie)
            return dataMovie
        })
        .catch(err => {
            console.log(err)
        })
}

const getMovieById = id => {

}

module.exports = {
    getMovieByTitle,
    getMovieById
}

// async function getMovieByTitle(title, next) {
//     try {
//         const result = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.apikey}&s=${title}`)
//         let dataMovie = result.data.Search[0]
//         console.log(`ini dataMovie`, dataMovie)
//         return dataMovie
//     } catch (error) {
//         return next(error)
//     }
// }