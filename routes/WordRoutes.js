const passport = require('passport');
const { calculateLexicalComplexity, saveWord } = require.main.require('./services/WordService');

module.exports = (app) => {
    /**
     * @api {post} /api/v1/words
     * @apiName Save a non lexical word
     * @apiGroup Word
     * @apiVersion 1.0.0
     *
     * @apiParam {String} Name name of the word.
     *
     * @apiSuccess {String} _id primary key of the document.
     * @apiSuccess {String} Name name of the word.
     */
    app.post('/api/v1/words', passport.authenticate('jwt', { session: false }), async (req, res) => {
        try {
            const result = await saveWord(req.body);
            res.status(result.code).send(result.data);
        } catch (err) {
            res.status(err.code).send(err.error);
        }
    });

    /**
     * @api {post} /api/v1/words/complexity
     * @apiName Calculate Lexical Complexity
     * @apiGroup Word
     * @apiVersion 1.0.0
     *
     * @apiParam {String} mode mode of the result.
     * @apiParam (Request Body) {String} text input text given by the user.
     *
     * @apiSuccess {Number} overall_ld overall lexical complexity.
     * @apiSuccess {Array} sentence_ld lexical complexity sentence by sentence.
     */
    app.post('/api/v1/words/complexity', async (req, res) => {
        try {
            const result = await calculateLexicalComplexity(req.body.text, req.query.mode);
            res.status(result.code).send(result.data);
        } catch (err) {
            res.status(err.code).send(err.error);
        }
    });
};
