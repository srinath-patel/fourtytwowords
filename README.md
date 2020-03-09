# Fourtytwowords
A Command Line Tool to get data of 42 words. The data contains synonyms, antonyms, definitions and examples for the Fourty two words. The command line play is used to guess the word based on definition, antonym or synonym with total of 3 chances and a hint for last chance. The hint will be jumbled answer or definition or synonym or antonym. The Api used for the tool is https://fourtytwowords.herokuapp.com/ 

## Usage

Environment variables are stored in 

```config/env.js file```

Content of this file is 

```Javascript
const config = {
    api_key : '******',
    host : 'https://fourtytwowords.herokuapp.com/'
}
module.exports = {
    config
}
```
API endpoints for the CLI tool

```
./dict defn <word> -- For Word Definitions


 ./dict syn <word> -- For Word Synonyms


 ./dict ant <word> -- For Word Antonyms


 ./dict ex <word> -- For Word Examples


 ./dict <word> -- To Display Word Definitions, Word Synonyms, Word Antonyms & Word Examples for a given word.


 ./dict  -- To Display Word Definitions, Word Synonyms, Word Antonyms & Word Examples for a random word.


 ./dict play -- To play guess the word.
```
