const { calculateLexicalComplexity } = require('../services/WordService.js');
const { ErrorMessages } = require('../utilities');
const { _processLexicalComplexity } = require('../utilities/Helpers.js');
const {sentence, nonLexicalWords} = require('./inputs');

test("A sentence not having any non lexical words", () => {
    expect(_processLexicalComplexity("Sample String", nonLexicalWords)).toBe(1);
});

test("Sample input given in the document", () => {
    expect(
        _processLexicalComplexity("Kim loves going to the cinema", nonLexicalWords)
    ).toEqual(0.67);
});

test("Error should be thrown with proper message when input isn't a string", async () => {
    try {
        await calculateLexicalComplexity(120.20);
    } catch (e) {
        expect(e.error.message).toMatch(ErrorMessages.BAD_REQUEST);
    }
});

test("Error should be thrown with proper message when input is empty", async () => {
    try {
        await calculateLexicalComplexity('');
    } catch (e) {
        expect(e.error.message).toMatch(ErrorMessages.BAD_REQUEST);
    }
});

test("Error should be thrown with proper message when input is exceeded by 1000 characters", async () => {
    try {
        await calculateLexicalComplexity(sentence);
    } catch (e) {
        expect(e.error.message).toMatch(ErrorMessages.EXCEEDED);
    }
});

test("Error should be thrown with proper message when input is exceeded by 100 words", async () => {
    try {
        await calculateLexicalComplexity(sentence);
    } catch (e) {
        expect(e.error.message).toMatch(ErrorMessages.EXCEEDED);
    }
});

