const request = require('superagent');


module.exports = ({commentsRouter}) => {
    commentsRouter.get('/', async (ctx, next) => {
        // console.log(ctx.params);
        await request
            .get(`https://jsonplaceholder.typicode.com/posts/${ctx.params.id}/comments`)
            .then(res => {
                ctx.body = res.body;
            })
            .catch(err => console.log(err));
    });
};
