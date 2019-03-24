const knex = require('../connection');

const getAllMovies = () => {
    return knex('movies').select('*');
};

const getSingleMovie = (id) => {
    return knex('movies').select('*')
        .where({id: Number(id)});
};

const addMovie = (movie) => {
    return knex('movies').insert(movie)
        .returning('*');
};

const updateMovie = (id, movie) => {
    return knex('movies').update(movie)
        .where({id: Number(id)})
        .returning('*');
};

const deleteMovie = () => {
    return knex('movies').delete()
        .where({id: Number(id)})
        .returning('*');
};

module.exports = {
    getAllMovies,
    getSingleMovie,
    addMovie,
    updateMovie,
    deleteMovie,
};
