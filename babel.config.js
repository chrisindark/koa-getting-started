module.exports = function (api) {
    api.cache(true);

    const presets = ["@babel/env"];
    const plugins = ["@babel/plugin-transform-async-to-generator"];

    return {
        presets,
        plugins
    };
};
