//The model is used to get a random word
const axios = require('axios')

const randWord = function() {}

randWord.prototype.randWordFunc = function(req, config, callback) {
var apiType = 'randomWord'
var apiurl = `${config.host}words/${apiType}?api_key=${config.api_key}`
//Getting a random word from API using axios
    axios({
        method: 'get',
        url: apiurl
      })
        .then((response) => {

            callback(null, response.data.word)
            
        }).catch((e)=>{
            callback(e, null)
        });
    
}

module.exports = new randWord()    