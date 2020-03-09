#!/usr/bin/env node

//importing node modules
var chalk = require('chalk')

//importing modils from ./models folder
var wordDefinitions = require('./models/definitions'),
relatedWords = require('./models/relatedWords'),
examples = require('./models/examples'),
dictHelp = require('./models/dictHelp'),
wordInfo = require('./models/wordInfo'),
randWordInfo = require('./models/randWordInfo'),
play = require('./models/play')

//Setting some global values
var myArgs = process.argv.slice(2),
    {config} = require('./env')


if(myArgs[1]){
    switch(myArgs[0]){
    //Excuting the word definition function
    case "defn":
        wordDefinitions.wordDefinitionsFunc(myArgs, config, (err, data)=>{
            if(err){
                console.log(chalk.bold.red(err))
            } else {
                console.log(chalk.bold.green(data))
            }
        })
    break;
    //Excuting the word synonym function
    case "syn":
        relatedWords.relatedWordsFunc(myArgs, config, (err, data)=>{
            if(err){
                console.log(chalk.bold.red(err))
            } else {
                console.log(chalk.bold.green(data))
            }
        })
    break;
    //Excuting the word antonym function
    case "ant":
        relatedWords.relatedWordsFunc(myArgs, config, (err, data)=>{
            if(err){
                console.log(chalk.bold.red(err))
            } else {
                console.log(chalk.bold.green(data))
            }
        })
    break;
    //Excuting the word example function
    case "ex":
        examples.examplesFunc(myArgs, config, (err, data)=>{
            if(err){
                console.log(chalk.bold.red(err))
            } else {
                console.log(chalk.bold.green(data))
            }
        })
    break;
    default:
        // A default function for help if the command doesn't match any cases
        dictHelp.dictHelpFunc(myArgs, config, (err, data)=>{
            if(err){
                console.log(chalk.bold.red(err))
            } else {
                console.log(chalk.bold.green(data))
            }
        })
    }
} else if(myArgs[0]){
    if(myArgs[0] == "play"){
        //Executing function to play guess the word. 
    play.playFunc(myArgs, config, (err, data)=>{
        if(err){
            console.log(chalk.bold.red(err))
        } else {
            console.log(chalk.bold.green(data))
        }
    })
} else{
    //Executing function to display all given word data available
    wordInfo.wordInfoFunc(myArgs, config, (err, data)=>{
        if(err){
            console.log(chalk.bold.red(err))
        } else {
            console.log(chalk.bold.green(data))
        }
    })
}
} else {
    //Executing function to display all random word data available
    randWordInfo.randWordInfoFunc(myArgs, config, (err, data)=>{
        if(err){
            console.log(chalk.bold.red(err))
        } else {
            console.log(chalk.bold.green(data))
        }
    })
}