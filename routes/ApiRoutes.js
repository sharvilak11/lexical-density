const log = require('../logger/Log');

module.exports = (app) => {

    app.get('/', function(req, res) {
        res.json({
            status: 'OK!',
            message: 'Welcome to the lexical density API',
            instructions: 'Submit a post request with the input string to analyze'
        })
    });

    app.use((req, res, next) => {
        res.status(404);
        log.error('%s %d %s', req.method, res.statusCode, req.url);
        res.json({
            message: 'Not found'
        });
        next(false);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        log.error('%s %d %s', req.method, res.statusCode, err.message);
        res.json({
            message: err.message
        });
        next(false);
    });
};
