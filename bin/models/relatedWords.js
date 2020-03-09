//This model is used to get synonyms and antonyms from a API
const axios = require('axios'),
chalk = require('chalk'),
figures = require('figures')

const relatedWords = function() {}

relatedWords.prototype.relatedWordsFunc = function(req, config, callback) {
var apiType = 'relatedWords'
var apiurl = `${config.host}word/${req[1]}/${apiType}?api_key=${config.api_key}`
 // Getting synonyms and antonyms of a word using axios module  
    axios({
        method: 'get',
        url: apiurl
      })
        .then((response) => {
            // filtering the antonyms or synonyms depending on command
            if(req[0] == "syn"){
                var noResult = "No synonyms available for this word"
                var wordList = response.data.filter(element =>{
                    return element.relationshipType == "synonym"
                })
            } else if(req[0] == "ant"){
                var noResult = "No antonyms available for this word"
                var wordList = response.data.filter(element =>{
                    return element.relationshipType == "antonym"
                })    
            }

            
            if(req[0] == "syn" || req[0] == "ant"){
                //to get the response in object format
                 if(req[2] == "obj"){
                    var res = wordList;
                    callback(null, res)
                } else if(wordList.length == 0){
                    callback(noResult, null)
                } else {
                    //to get the response in designed list format
                var res = `\n\n The ${wordList[0].relationshipType}(s) for word ${chalk.yellow(req[1])} are: \n`
                
                wordList[0].words.forEach(element => {
                    res += `\n ${figures.pointer} ${element} \n`
                });
                callback(null, res)
            }
            } else{
                //to get the response in object format
                if(req[2] == "obj"){
                    var res = response.data.reverse();;
                    callback(null, res)
                } else {
                    //to get the response in designed list format
                    var res = ``
                    response.data.reverse();
                    response.data.forEach(wordList => {           
                        res += `\n\n The ${wordList.relationshipType}(s) for word ${chalk.yellow(req[1])} are: \n`      
                        wordList.words.forEach(element => {
                            res += `\n ${figures.pointer} ${element} \n`
                        })
                    })
                    callback(null, res)
                }
                
            }
            
        }).catch((e)=>{
            callback(e, null)
        });
    
}

module.exports = new relatedWords()    