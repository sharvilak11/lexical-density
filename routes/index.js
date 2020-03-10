module.exports = (app) => {
    require('./WordRoutes')(app);
    require('./ApiRoutes')(app);
};
