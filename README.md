# Lexical Density

Calculate the lexical density from a sentence or sentences.

## Instructions

- `npm install` installs dependencies
- `npm run start` to run the project
- `npm run test` run tests

## Approach

- Function to calculate lexical complexity
  - split string into words and clean (ignore case, ignore numbers)
  - store number of words (wordCount)
  - remove non lexical words
  - divide remaining array with total words (lexicalComplexity)
- API routes
  - /api/v1/words/complexity
    - Returns the overall lexical complexity of a submitted string via request
    - output: `{"data" : { overall_ld: 0.42 } }`
  - /api/v1/words/complexity?mode=verbose
    - Returns the lexical complexity broken down into sentences
    - output: `{ "data": { sentece_ld: [ 0.23, 0.1, 1.0, 0.0 ], overall_ld: 0.42 }}`
  - /api/v1/words
    - Saves a new word in the mongodb
    - output: `{"data": { Name: 'test', _id: '5e67c0e4863ca31686eb368e'}`
  - passport JWT strategy for authenticated routes
  - API Documentation will be found in docs/ folder
  - /api/v1/words/complexity is a post API because input text might be bigger and can be only accomodated in the request's body
- Error scenarios
  - Only text with up to 100 words
  - Only text with up to 1000 characters


## Folder Structure and naming convention

- Naming convention for files : *ProperCase* index.js has been kept in all folders which contain code.
- Naming convention for variables & methods: *camelCase*
- `package.json` contains dependencies, node scripts and project description
- `index.js` initializes the app and glues everything together
- `docs/` documentation about the project
- `logger/` winston logger.
- `middlewares/` contains all middlewares. Only middleware currently added is for authentication
- `models` mongoose models which acts as an ORM
- `routes` actual api routes 
- `services` reusable services which contains the actual logic of the process
- `tests` unit tests written with jest
- `utils` utilities including helpers and error messages. Reason behind keeping a separate file for error messages is because you can come later at any point of time and change all errors messages of the project in a single shot.
- .env - contains all env files. This is not meant to be committed but since it's a test, committing the same to git. 
