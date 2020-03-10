const Word = require.main.require('./models/Word').model;

const { _processLexicalComplexity } = require.main.require('./helpers');

/*
 * calculateLexicalComplexity - calculates the lexical density based on text and mode
 * @param (String) text - input text provided by the user
 * @param (String) mode - mode of calculating lexical complexity (enum: verbose)
 */
const calculateLexicalComplexity = (text, mode) => {
    return new Promise(async (resolve, reject) => {
        const sentences = typeof text === 'string' ? text.match(/[^\.!\?]+[\.!\?]+/g) : '';

        if (!text || text.length > 1000 || sentences.length > 100) {
            return reject({
                code: 400,
                error: {
                    message: utilities.ErrorMessages.BAD_REQUEST
                }
            });
        }
        let result = {};
        let words = [];
        try {
            words = await getLexicalWords({}, {_id: 0, Name: 1});
        } catch (err) {
            return reject({
                code: err.code,
                error: err.error
            });
        }
        if (mode === 'verbose') {   // process sentences if mode is verbose
            let sentenceResults = [];
            sentences.forEach((sentence) => {
                if (sentence)   // Process only sentence with data - avoid last fullstop or question mark etc.
                    sentenceResults.push(_processLexicalComplexity(sentence, words));
            });
            result['sentence_ld'] = sentenceResults;
        }
        result['overall_ld'] = _processLexicalComplexity(text, words);   // process for average considering whole text
        resolve({
            code: 200,
            data: result
        });
    });
};

/*
 * calculateLexicalComplexity - calculates the lexical density based on text and mode
 * @param (Object) condition - condition for find's where clause
 * @param (Object) projection - fields which need to be fetched from db call
 */
const getLexicalWords = (condition, projection) => {
    return new Promise(async (resolve, reject) => {
        Word.find(condition, projection, (err, words) => {
            if (err) {
                return reject({
                    code: 500,
                    error: err
                });
            }
            resolve(words.map(word => word.Name.toLowerCase()));
        });
    });
};

module.exports = {
    calculateLexicalComplexity
};
