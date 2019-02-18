module.exports = ({ router }) => {
    // getting the root route
    router.get('/', (ctx, next) => {
        const attrs = {
            styleTags: [1, 2, 3, 4, 5],
            scriptTags: [1, 2, 3, 4, 5]
        };
        return ctx.render('index', {
            attrs: attrs
        });
    });
};
