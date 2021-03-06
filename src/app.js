const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const render = require('koa-ejs');
const bodyparser = require('koa-bodyparser');

const app = new Koa();
app.use(logger());
app.use(bodyparser());
// app.use(async ctx => {
//     ctx.body = 'hello world';
// });

// const router = new Router();
// router.get('/', (ctx, next) => {
//     ctx.body = 'hello world';
// });

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
});

// error handling
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});

// instantiate our new Router
const router = new Router();
const postsRouter = new Router({
    prefix: '/posts'
});
const postDetailRouter = new Router({
    prefix: '/posts/:id'
});
const commentsRouter = new Router({
    prefix: '/posts/:id/comments'
});

require('./routes')({ router });
require('./routes/posts')({ postsRouter });
require('./routes/postDetail')({ postDetailRouter });
require('./routes/comments')({ commentsRouter });

// require our external routes and pass in the router
app.use(router.routes());
app.use(router.allowedMethods());

app.use(postsRouter.routes());
app.use(postsRouter.allowedMethods());

app.use(postDetailRouter.routes());
app.use(postDetailRouter.allowedMethods());

app.use(commentsRouter.routes());
app.use(commentsRouter.allowedMethods());

const movieRoutes = require('./routes/movies');
app.use(movieRoutes.routes());

const PORT = 8000;
const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
