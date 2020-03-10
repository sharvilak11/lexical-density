const Word = require('../models/Word').model;

const { _processLexicalComplexity } = require('../utilities/Helpers');
const { ErrorMessages } = require('../utilities');

/*
 * calculateLexicalComplexity - calculates the lexical density based on text and mode
 * @param (String) text - input text provided by the user
 * @param (String) mode - mode of calculating lexical complexity (enum: verbose)
 */
const calculateLexicalComplexity = (text, mode) => {
    return new Promise(async (resolve, reject) => {
        if (!text || typeof text !== 'string') {
            return reject({
                code: 400,
                error: {
                    message: ErrorMessages.BAD_REQUEST
                }
            });
        }
        const words = text.match(/[^\.!\?]+[\.!\?]+/g);
        if (text.length > 1000 || words.length > 100) {
            return reject({
                code: 400,
                error: {
                    message: ErrorMessages.EXCEEDED
                }
            });
        }
        let result = {};
        let nonLexicalWords = [];
        try {
            nonLexicalWords = await getLexicalWords({}, {_id: 0, Name: 1});
        } catch (err) {
            return reject({
                code: err.code,
                error: err.error
            });
        }
        if (mode === 'verbose') {   // process sentences if mode is verbose
            let sentenceResults = [];
            words.forEach((word) => {
                if (word)   // Process only sentence with data - avoid last fullstop or question mark etc.
                    sentenceResults.push(_processLexicalComplexity(word, nonLexicalWords));
            });
            result['sentence_ld'] = sentenceResults;
        }
        result['overall_ld'] = _processLexicalComplexity(text, nonLexicalWords);   // process for average considering whole text
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

const saveWord = (word) => {
    return new Promise(async (resolve, reject) => {
        if (!word || !word.Name) {
            return reject({
                code: 400,
                error: {
                    message: ErrorMessages.BAD_REQUEST
                }
            });
        }
        const w = new Word(word);
        w.save(err => {
            if (err) {
                return reject({
                    code: 500,
                    error: err
                });
            }
            resolve({
                code: 200,
                data: w
            });
        });
    });
};

module.exports = {
    calculateLexicalComplexity,
    saveWord
};
