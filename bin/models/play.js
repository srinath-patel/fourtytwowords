//This model is used to play guess the word.
var chalk = require('chalk'),
figures = require('figures'),
inquirer = require('inquirer')

//Retriving models
var randWord = require('./randWord'),
wordDefinitions = require('./definitions'),
relatedWords = require('./relatedWords')

const play = function() {}

//Function to shuffle word in hint when answer is wrong in play
function shuffleWord(word){
    String.prototype.splice = function(idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem))
    }
    var firstChar = word[0]
    word = word.substring(1)
    word = word.split('').sort(function(){return 0.5-Math.random()}).join('')
    word = word.splice(Math.round(word.length/2),0, firstChar )
    return word
}

play.prototype.playFunc = function(req, config, callback) {
    randWord.randWordFunc([], config, (err, word)=>{
        if(err){
            callback(err, null)
        } else { 
        var wordInfo = new Object()
            wordInfo.word = word
               //promise to get the word definition from other model   
            var wordDefn = function(){
                return new Promise(function(resolve, reject){
                    var myArgs = ['defn', wordInfo.word, 'obj']
                    wordDefinitions.wordDefinitionsFunc(myArgs, config, (err, data)=>{
                        if(err){
                            reject(err)
                        } else {
                            resolve(data)
                        }
                    })
                })
            } 
            //promise to get the synonyms and antonyms from other model
            var wordRelated = function(){
                return new Promise(function(resolve, reject){
                    var myArgs = ['other', wordInfo.word, 'obj']
                    relatedWords.relatedWordsFunc(myArgs, config, (err, data)=>{
                        if(err){
                            reject(err)
                        } else {
                            resolve(data)
                        }
                    })
                })
            }
              
            //executing all the promises for the response using all method of promise
            Promise.all([wordDefn(), wordRelated()]).then(values => {
                //setting up values to wordinfo object
                wordInfo.definitions = values[0]
                if(values[1][0]){
                    wordInfo.synonyms = values[1][0].words
                }
                if(values[1][1]){
                    wordInfo.antonyms = values[1][1].words
                }
                var wordDict =  JSON.parse(JSON.stringify(wordInfo))
                //Start of play
                // console.log(wordInfo)
                console.log(chalk.bold.green('\n ** Guess the word ** '))
                // Getting a random definition of the word
                var defnPosition = Math.round(Math.random() * (wordInfo.definitions.length-1))
                console.log(chalk.bold.blue('\n Definition -- \n') + chalk.bold.green(` ${wordInfo.definitions[defnPosition]} `))
                wordInfo.definitions.splice(defnPosition, 1)

                // function to get a random synonym or antonym of the word
                function synorant(){
                    if(wordInfo.synonyms && wordInfo.antonyms){
                        if(Math.round(Math.random()) == 0){
                            var wordPosition = Math.round(Math.random() * (wordInfo.synonyms.length-1))
                            console.log(chalk.bold.blue('\n Synonym -- '))
                            console.log(chalk.bold.green(` ${wordInfo.synonyms[wordPosition]} `))
                            wordInfo.synonyms.splice(wordPosition, 1)
                        } else {
                            var wordPosition = Math.round(Math.random() * (wordInfo.antonyms.length-1))
                            console.log(chalk.bold.blue('\n Antonym -- '))
                            console.log(chalk.bold.green(` ${wordInfo.antonyms[wordPosition]} `))
                            wordInfo.antonyms.splice(wordPosition, 1)
                        }
                    } else if(wordInfo.synonyms){
                        var wordPosition = Math.round(Math.random() * (wordInfo.synonyms.length-1))
                            console.log(chalk.bold.blue('\n Synonym -- '))
                            console.log(chalk.bold.green(` ${wordInfo.synonyms[wordPosition]} `))
                            wordInfo.synonyms.splice(wordPosition, 1)
                    } else if(wordInfo.antonyms){
                        var wordPosition = Math.round(Math.random() * (wordInfo.antonyms.length-1))
                            console.log(chalk.bold.blue('\n Antonym -- '))
                            console.log(chalk.bold.green(` ${wordInfo.antonyms[wordPosition]} `))
                            wordInfo.antonyms.splice(wordPosition, 1)
                    }
            }

            synorant()

            console.log('\n')
            //First Chance
                inquirer.prompt({"name":"firstChance", "message":"Guess the word from above details: "}).then(data=>{
                    if(data.firstChance == wordInfo.word || wordInfo.synonyms.includes(data.firstChance)){
                        //correct answer
                        console.log(chalk.bold.green(`${figures.tick} Perfect! ${chalk.bold.yellow(data.firstChance)} is correct answer.`))    
                    } else {
                        console.log(chalk.bold.red(`\n${figures.cross} Sorry! ${chalk.bold.yellow(data.firstChance)} is wrong answer or shown in the question, Try again. \n`))
                        console.log('\n')
                        //Second Chance
                        inquirer.prompt({"name":"secondChance", "message":"Guess the word again: "}).then(data =>{
                            if(data.secondChance == wordInfo.word || wordInfo.synonyms.includes(data.secondChance)){
                                //Correct Answer
                                console.log(chalk.bold.green(`${figures.tick} Yes! ${chalk.bold.yellow(data.secondChance)} is correct answer.`))
                            } else {
                                console.log(chalk.bold.red(`\n${figures.cross} Sorry! ${chalk.bold.yellow(data.secondChance)} is wrong answer or shown in the question, Try again with hint. \n`))
                                //Random hint jumbled answer or definition or synonym or antonym
                                var hintType = Math.round(Math.random() * 2)
                                if(hintType == 0){
                                    console.log(chalk.bold.blue('\n Hint: Word Jumbled -- '))
                                    console.log(chalk.bold.yellow(` ${shuffleWord(wordInfo.word)} `))
                                } else if(hintType == 2){
                                    console.log(chalk.bold.blue(" Hint: "))
                                    synorant()
                                } else {
                                    defnPosition = Math.round(Math.random() * (wordInfo.definitions.length-1))
                                    console.log(chalk.bold.blue('\n Hint: Definition -- \n') + chalk.bold.green(` ${wordInfo.definitions[defnPosition]} `))
                                    wordInfo.definitions.splice(defnPosition, 1)
                                } 
                                console.log('\n')
                                //Third Chance
                                inquirer.prompt({"name":"thirdChance", "message":"Guess the word again: "}).then(data=>{
                                    if(data.thirdChance == wordInfo.word || wordInfo.synonyms.includes(data.thirdChance)){
                                        //Correct Answer
                                        console.log(chalk.bold.green(`${figures.tick} Hurray! ${chalk.bold.yellow(data.thirdChance)} is correct answer.`))
                                        console.log(chalk.bold.red(`Quit`));
                                    } else{
                                        //Final chance wrong answer
                                        console.log(chalk.bold.red(`\n${figures.cross} Wrong Answer! Good Try \n\n`))
                                        //WordDict
                                        console.log(chalk.bold.blue(`*****  Word Info  *****`));
                                        console.log(wordDict)
                                        console.log(chalk.bold.blue(`***********************`));
                                        console.log(chalk.bold.red(`Quit`));
                                    }
                                })

                                    }
                                })    
                    }
                    
                })
            }).catch(e => {
                callback(e, null)
            })   
        }
    })
    
}

module.exports = new play()    