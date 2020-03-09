//This model is used to get the definition of a word
const axios = require('axios'),
chalk = require('chalk'),
figures = require('figures')

const wordDefinitions = function() {}

wordDefinitions.prototype.wordDefinitionsFunc = function(req, config, callback) {
var apiType = 'definitions'
var apiurl = `${config.host}word/${req[1]}/${apiType}?api_key=${config.api_key}`
//API is called to get the definitions of the word using axios 
    axios({
        method: 'get',
        url: apiurl
      })
        .then((response) => {
            //To get the response in a object format
            if(req[2] == 'obj'){
                var res = response.data.map(val=>{
                    return val.text
                })
            } else {
                //To get the response in list format
            var res = `\n\n The ${apiType} for word ${chalk.yellow(req[1])} are: \n`
            response.data.forEach(element => {
                res += `\n ${figures.pointer} ${element.text} \n`
            })
        }
            callback(null, res)
        }).catch((e)=>{
            callback(e, null)
        })
    
}

module.exports = new wordDefinitions()    