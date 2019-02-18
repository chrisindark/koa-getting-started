const request = require('superagent');


module.exports = ({postDetailRouter}) => {
    postDetailRouter.get('/', async (ctx, next) => {
        // console.log(ctx.params);
        await request
            .get(`https://jsonplaceholder.typicode.com/posts/${ctx.params.id}`)
            .then(res => {
                ctx.body = res.body;
            })
            .catch(err => {
                console.log(err);
            });
    });
};
