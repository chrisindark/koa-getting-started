const request = require('superagent');


module.exports = ({postsRouter}) => {
    postsRouter.get('/', async (ctx, next) => {
        await request
            .get('https://jsonplaceholder.typicode.com/posts/')
            .then(res => {
                ctx.body = res.body;
            })
            .catch(err => {
                console.log(err);
            });
    });
};
