const axios = require('axios').default,
chalk = require('chalk'),
figures = require('figures')

const examples = function() {}

examples.prototype.examplesFunc = function(req, config, callback) {
var apiType = 'examples'
var apiurl = `${config.host}word/${req[1]}/${apiType}?api_key=${config.api_key}`
// Retriving data from examples api and passing it to the callback function
    axios({
        method: 'get',
        url: apiurl
      })
        .then((response) => {
            var res = `\n\n The ${apiType} for word ${chalk.yellow(req[1])} are: \n`
            response.data.examples.forEach(element => {
                res += `\n ${figures.pointer} ${element.text} \n`
            });
            callback(null, res)
        }).catch((e)=>{
            callback(e, null)
        });
    
}

module.exports = new examples()    