/*
 * _processLexicalComplexity - processes the lexical complexity for each sentence
 * @param (String) text - text for a sentence
 * @param (Array) nonLexicalWords - all non lexical words
 */
const _processLexicalComplexity = (text, nonLexicalWords) => {
    // Trim + Lowercase + Regex + Divide the sentence into words + remove blanks
    const strArr = text.trim().toLowerCase().replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g).split(" ").filter(item => item !== "");

    const filteredWords = strArr.filter((word) =>  {
        return nonLexicalWords.indexOf(word) < 0; // indexOf is a faster function than includes, hence let's not use includes !!
    });
    return Number((filteredWords.length/strArr.length).toFixed(2));
};

module.exports = {
    _processLexicalComplexity
};
