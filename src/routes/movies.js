const Router = require('koa-router');
const queries = require('../db/queries/movies');


const router = new Router();
router.get('/movies', async (ctx, next) => {
    try {
        const movies = await queries.getAllMovies();
        ctx.body = {
            status: 'success',
            data: movies
        };
    } catch (err) {
        console.log(err)
    }
});

router.get('/movies/:id', async (ctx, next) => {
    try {
        const movie = await queries.getSingleMovie(ctx.params.id);
        if (movie.length) {
            ctx.body = {
                status: 'success',
                data: movie
            };
        } else {
            ctx.body = {
                status: 'error',
                message: 'That movie does not exist.'
            };
        }
    } catch (err) {
        console.log(err)
    }
});

router.post(`/movies`, async (ctx) => {
    try {
        const movie = await queries.addMovie(ctx.request.body);

        if (movie.length) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: movie
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'
            };
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
});

router.put(`/movies/:id`, async (ctx) => {
    try {
        const movie = await queries.updateMovie(ctx.params.id, ctx.request.body);
        if (movie.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: movie
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That movie does not exist.'
            };
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
});

router.delete(`/movies/:id`, async (ctx) => {
    try {
        const movie = await queries.deleteMovie(ctx.params.id);
        if (movie.length) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: movie
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That movie does not exist.'
            };
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
});

module.exports = router;
