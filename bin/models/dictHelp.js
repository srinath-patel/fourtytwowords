var chalk = require('chalk'),
figures = require('figures')

const dictHelp = function() {}

dictHelp.prototype.dictHelpFunc = function(req, config, callback) {
//Variable with documentation of commands used when command is wrong
var help = `
\n ${chalk.red(figures.circleCross+' Something is wrong with the command please try the following commands:')} \n
\n ./dict defn <${chalk.red('word')}> -- For Word Definitions \n
\n ./dict syn <${chalk.red('word')}> -- For Word Synonyms \n
\n ./dict ant <${chalk.red('word')}> -- For Word Antonyms \n
\n ./dict ex <${chalk.red('word')}> -- For Word Examples \n
\n ./dict <${chalk.red('word')}> -- To Display Word Definitions, Word Synonyms, Word Antonyms & Word Examples for a given word. \n
\n ./dict  -- To Display Word Definitions, Word Synonyms, Word Antonyms & Word Examples for a random word. \n
\n ./dict play -- To play guess the word. \n
`
callback(null, help)
}

module.exports = new dictHelp()    