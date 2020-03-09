//
var wordDefinitions = require('./definitions'),
relatedWords = require('./relatedWords'),
examples = require('./examples')

const wordInfo = function() {}

wordInfo.prototype.wordInfoFunc = function(req, config, callback) {

var wordDefn = function(){
    return new Promise(function(resolve, reject){
        var myArgs = ['defn', req[0]]
        //Retriving the data from definition function
        wordDefinitions.wordDefinitionsFunc(myArgs, config, (err, data)=>{
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

var wordRelated = function(){
    return new Promise(function(resolve, reject){
        var myArgs = ['other', req[0]]
        //Retriving the data from relatedWords function which contains antonyms and synonyms
        relatedWords.relatedWordsFunc(myArgs, config, (err, data)=>{
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

var wordExamples = function(){
    return new Promise(function(resolve, reject){
        var myArgs = ['ex', req[0]]
                //Retriving the data from example function
        examples.examplesFunc(myArgs, config, (err, data)=>{
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

//Executing all above promises with all method and display the data by concatinating them
Promise.all([wordDefn(), wordRelated(), wordExamples()]).then(values => {
    var data = ``
    values.forEach(element => {
        data += element
    });
    callback(null, data)
}).catch(e => {
    callback(e, null)
})      
}

module.exports = new wordInfo()    