const { calculateLexicalComplexity } = require.main.require('./services/WordService');

module.exports = (app) => {
    app.post('/api/v1/words/complexity', async (req, res) => {
        try {
            const result = await calculateLexicalComplexity(req.body.text, req.query.mode);
            res.status(result.code).send(result.data);
        } catch (err) {
            res.status(err.code).send(err.error);
        }
    });
};
