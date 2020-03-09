//This model is used to get all the available data of a random word
var wordInfo = require('./wordInfo'),
randWord = require('./randWord')

const randWordInfo = function() {}

randWordInfo.prototype.randWordInfoFunc = function(req, config, callback) {
//Retriving a random word from randword model
        randWord.randWordFunc([], config, (err, data)=>{
            if(err){
                callback(err, null)
            } else {
                var myArgs = [data]
                //Retriving all available data of above random word using wordinfo model
                wordInfo.wordInfoFunc(myArgs, config, (err, data)=>{
                    if(err){
                        callback(err, null)
                    } else {
                        callback(null, data)
                    }
                })
            }
        })    
    
}

module.exports = new randWordInfo()    